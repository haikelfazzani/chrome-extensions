chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  switch (request) {
    case 'changeBack':
      document.body.style.background = "#000"
      document.body.style.color = "#fff !important"

      sendResponse({ msg: 'background changed' })
      break;

    case 'jsonParse':
      var getPre = document.querySelector('pre')
      getPre.textContent = JSON.stringify(JSON.parse(getPre.textContent), null,2)
      
      break;

    default:
      break;
  }
})