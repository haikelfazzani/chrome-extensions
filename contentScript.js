chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  document.body.style.background = "#000"
  document.body.style.color = "#fff !important"
  
  sendResponse({msg:'background changed'})
})