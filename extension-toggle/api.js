// get all check inputs elements
function getCheckInputs () {
  const checkInput = document.querySelectorAll('.form-check-input');
  return checkInput;
}

// create list of extensions
function createList (extensions) {

  var ulList = document.getElementById('list');

  ulList.innerHTML = '';
  extensions.forEach(extension => {
    ulList.innerHTML += `
<li id="${extension.id}"  class="${extension.enabled ? 'bg-rose' : ''} w-25">
  <button class="btn btn-danger" data-id="${extension.id}">RM</button>
  <div class="ext-d">
    <p class="w-75">${extension.name}</p>    
    <span class="badge ${extension.isApp ? 'bg-g' : ''} w-25">${extension.isApp ? 'app' : 'extension'}</span>
  </div>

  ${extension.enabled
        ? `<input class="form-check-input" type="checkbox" data-id="${extension.id}" checked>`
        : `<input class="form-check-input" type="checkbox" data-id="${extension.id}">`}
</li>`});
}

// on click check input : enable or disable extension
function enableDisableExt (checkInput) {
  Object.keys(checkInput).forEach(v => {
    checkInput[v].addEventListener('change', (e) => {

      const extensionId = e.target.dataset.id;
      const status = e.target.checked;
      chrome.management.setEnabled(extensionId, status);

      const extLi = document.getElementById(extensionId);
      if (status) {
        extLi.classList.add('bg-rose');
      }
      else {
        extLi.classList.remove('bg-rose');
      }
    });
  }); // object loop
}