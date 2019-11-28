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
        data.forEach(element => {
          ulList.innerHTML += `<li><a href="${element.url}" target="_blank">🔗 ${element.title}</a></li>`
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

  if (btnGetStorage) {
    btnGetStorage.addEventListener('click', () => {
      chrome.storage.sync.get(['key'], function (result) {
        alert('Value currently is ' + result.key);
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
