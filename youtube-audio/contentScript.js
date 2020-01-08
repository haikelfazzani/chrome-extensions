chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
console.log('conte t ',request, sender, sendResponse);

  switch (request) {
    case 'ping':
      document.body.style.backgroundColor = '#000'
      console.log('content script');
      sendRes({ mg: 'content response script' });
      break;

    default:
      break;
  }
  return true
})
