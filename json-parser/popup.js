document.addEventListener('DOMContentLoaded', function () {

  var btnJsonParse = document.getElementById('json-parse')
  btnJsonParse.addEventListener('click', () =>{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'jsonParse', (resp) => {
        console.log(resp);
        
      })
    });
  })


})
