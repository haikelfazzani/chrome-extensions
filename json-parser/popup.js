document.addEventListener('DOMContentLoaded', function () {

  let btnJsonParse = document.getElementById('json-parse')

  if (btnJsonParse) {
    btnJsonParse.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'jsonParse')
      });
    })
  }

})
