document.addEventListener('DOMContentLoaded', function () {

  var btnEd = document.getElementById('btn-ed')
  var btnTextStatus = "Enable"

  chrome.storage.local.get(['editpage'], function (result) {
    if (result.editpage) btnTextStatus = result.editpage
  });


  btnEd.addEventListener('click', () => {

    chrome.storage.local.get(['editpage'], function (result) {
      if (result.editpage) btnTextStatus = result.editpage
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'EditPage', (resp) => {
        btnTextStatus = resp.msg === 'on' ? 'Disable' : 'Enable'
        btnEd.innerHTML = btnTextStatus

        chrome.storage.local.set({ 'editpage': btnTextStatus }, function () {
          console.log('Value is set to ' + btnTextStatus);
        });

      })
    });
  })


})
