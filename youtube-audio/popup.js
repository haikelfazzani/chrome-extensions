document.addEventListener('DOMContentLoaded', function () {

  var btnJsonParse = document.getElementById('json-parse')

  btnJsonParse.addEventListener('click', () => {
    
    function ping() {
      chrome.runtime.sendMessage('ping', response => {
        if(chrome.runtime.lastError) {
          setTimeout(ping, 1000);
        } else {
          // Do whatever you want, background script is ready now
          console.log(response);
          
        }
      });
    }
    
    ping();


  })
})
