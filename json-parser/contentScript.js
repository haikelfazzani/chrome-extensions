chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  switch (request) {
    case 'jsonParse':
      var getPre = document.querySelector('pre')            
      getPre.textContent = JSON.stringify(JSON.parse(getPre.textContent), null, 2)
      break;

    default:
      break;
  }
  return true
})
