// get all check inputs elements
function getCheckInputs () {
  let checkInput = document.querySelectorAll('#mainToggle'); 
  return checkInput;
}

function createSwitchElement (extension) {
  return `<div class="sc-dxgOiQ cmgOtW mr-10">
  
  <input class="sc-kpOJdX eFIxha" type="checkbox" id="mainToggle" data-id="${extension.id}">
  
  <div class="sc-ckVGcZ gcyAeL">  
    <label class="sc-jKJlTe eznuVJ" for="mainToggle"></label>  
    ${extension.enabled
      ? `<label class="sc-eNQAEJ dTRKfN" for="mainToggle" data-st="${extension.id}"></label>`
      : `<label class="sc-eNQAEJ hzkbkt" for="mainToggle" data-st="${extension.id}"></label>`
    }
  </div>
  
</div>`;
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

  ${createSwitchElement(extension)}
</li>`});
}

// on click check input : enable or disable extension
function enableDisableExt (checkInput) {
  Object.keys(checkInput).forEach((v,i) => {

    checkInput[v].addEventListener('change', (e) => {

      const extensionId = e.target.dataset.id;
      const status = e.target.checked;
      
      chrome.management.setEnabled(extensionId, status);      

      const extLi = document.getElementById(extensionId);
      const switchElement = document.querySelector(`[data-st='${extensionId}']`);
      if (status) {
        switchElement.classList.remove('hzkbkt');
        switchElement.classList.add('dTRKfN');
        extLi.classList.add('bg-rose');
      }
      else {
        switchElement.classList.remove('dTRKfN');
        switchElement.classList.add('hzkbkt');
        extLi.classList.remove('bg-rose');
      }
    });
  }); // object loop
}