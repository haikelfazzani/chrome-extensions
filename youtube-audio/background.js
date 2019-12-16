chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => {
    // Handle message however you want
    console.log(msg);
    
  })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="#000"'
  });
});
