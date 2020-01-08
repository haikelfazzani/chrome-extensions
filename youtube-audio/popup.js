document.addEventListener('DOMContentLoaded', function () {

  var btnJsonParse = document.getElementById('json-parse')

  btnJsonParse.addEventListener('click', () => {
    console.log('pop');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

      function ping () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.runtime.sendMessage('ping', response => {
            if (chrome.runtime.lastError) {
              setTimeout(ping, 1000);
            } else {
              // Do whatever you want, background script is ready now
              console.log(response);
              return
            }
          });
        });
      }

      ping();
    });
  })



})
