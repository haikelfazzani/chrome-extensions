chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  switch (request) {    
    
    case 'jsonParse':
      console.log('ok');
      
      var getPre = document.querySelector('editor');
    
      getPre.textContent = JSON.stringify(JSON.parse(getPre.textContent), null, 2)
      break;

    default:
      break;
  }
  return true
})
