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
    changeColor.onclick = function (element) {
      let color = "#000";
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          { code: 'document.body.style.backgroundColor = "' + color + '";' });
      });
    };
  }

})