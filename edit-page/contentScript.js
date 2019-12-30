chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  switch (request) {
    case 'EditPage':
      var mode = document.designMode
      document.designMode = mode === "on" ? "off" : "on";
      sendResponse({ msg: mode })
      break;

    default:
      break;
  }
  return true
})
