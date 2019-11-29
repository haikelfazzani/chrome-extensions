document.addEventListener('DOMContentLoaded', function () {

  let btnTopSites = document.getElementById('top-sites')
  let changeColor = document.getElementById('changeColor');

  let btnSaveForLater = document.getElementById('save-for-later');
  let btnGetStorage = document.getElementById('get-storage')

  let btnJsonParse = document.getElementById('json-parse')  

  let ulList = document.getElementById('list')


  if (btnTopSites) {
    btnTopSites.addEventListener('click', () => {
      chrome.topSites.get(function (data) {
        ulList.innerHTML = ''
        data.forEach(element => {
          ulList.innerHTML += `
          <a href="${element.url}" class="list-group-item">🔗 ${element.title}</a>`          
        });
      })
    })
  }

  if (changeColor) {
    changeColor.onclick = function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'changeBack', onBackChange)
      });
    };

    function onBackChange (resp) { }
  }


  if (btnSaveForLater) {
    btnSaveForLater.addEventListener('click', () => {
      alert('ok')
      chrome.storage.sync.set({ 'key': 'hello storage' }, function () {
        //alert('Value is set to ');
      });
    })
  }

  

  if (btnJsonParse) {
    btnJsonParse.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'jsonParse')
      });
    })
  }




})
