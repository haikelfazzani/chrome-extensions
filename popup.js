document.addEventListener('DOMContentLoaded', function () {

  let btnTopSites = document.getElementById('top-sites')
  let changeColor = document.getElementById('changeColor');
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

    function onBackChange(resp) {
      alert(resp.msg);
      
    }
  }

})
