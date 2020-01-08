window.addEventListener('load', () => {

  var filterInput = document.getElementById('filter');
  var ulList = document.getElementById('list');

  // id, name, icons, enabled, isApp, description
  chrome.management.getAll(function (extensionsList) {

    filterInput.addEventListener('keyup', (e) => {
      let newResult = extensionsList.filter(r => r.name.toLowerCase().includes((e.target.value).toLowerCase()))
      createList(newResult && newResult.length > 0 ? newResult : extensionsList)
      enableDisableExt(document.querySelectorAll('.form-check-input'), extensionsList)
    })

    createList(extensionsList);
    enableDisableExt(document.querySelectorAll('.form-check-input'), extensionsList)
  }) // end getAll


  // on check input : enable extension or disable
  function enableDisableExt (chkkk, extensionsList) {
    Object.keys(chkkk).forEach(v => {
      chkkk[v].addEventListener('change', (e) => {

        const extensionId = e.target.dataset.id;
        const status = e.target.checked;
        // chrome.management.setEnabled(string id, boolean enabled, function callback)
        chrome.management.setEnabled(extensionId, status);

        if (status) {
          document.getElementById(extensionId).classList.add('bg-rose')
        }
        else {
          document.getElementById(extensionId).classList.remove('bg-rose')
        }

      })
    }) // object loop
  }

  function createList (extensions) {
    ulList.innerHTML = '';
    extensions.forEach(extension => {
      ulList.innerHTML += `
<li id="${extension.id}"  class="${extension.enabled ? 'bg-rose' : ''} w-25">
  <div class="ext-d">
    <p class="w-75">${extension.name}</p>    
    <span class="badge ${extension.isApp ? 'bg-g' : ''} w-25">${extension.isApp ? 'app' : 'extension'}</span>
  </div>

    ${extension.enabled
      ? `<input class="form-check-input" type="checkbox" data-id="${extension.id}" checked>`
      : `<input class="form-check-input" type="checkbox" data-id="${extension.id}">`}

</li>`});
  }

});
