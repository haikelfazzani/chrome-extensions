window.addEventListener('DOMContentLoaded', () => {

  var filterInput = document.getElementById('filter')
  var ulList = document.getElementById('list')

  // id, name, icons, enabled, isApp, description          
  chrome.management.getAll(function (result) {

    filterInput.addEventListener('keyup', (e) => {
      let newResult = result.filter(r => r.name.toLowerCase().includes((e.target.value).toLowerCase()))
      createList(newResult && newResult.length > 0 ? newResult : result)
      enableDisableExt(document.querySelectorAll('.form-check-input'))
    })

    createList(result)
    enableDisableExt(document.querySelectorAll('.form-check-input'))
  }) // end getAll


  function enableDisableExt (chkkk) {
    Object.keys(chkkk).forEach(v => {
      chkkk[v].addEventListener('change', (e) => {
        const extensionId = e.target.dataset.id;
        const status = e.target.checked
        // chrome.management.setEnabled(string id, boolean enabled, function callback)
        chrome.management.setEnabled(extensionId, status)
      })
    }) // object loop
  }

  function createList (extensions) {
    ulList.innerHTML = ''
    extensions.forEach(extension => {
      ulList.innerHTML += `      
<div class="list-group-item d-flex justify-content-between align-items-center">
  <p class="m-0">${extension.name} <span class="badge badge-primary">${extension.isApp ? 'app' : 'extension'}</span></p>
    
    <div>
    ${extension.enabled ?
      `<input class="form-check-input mt-0" type="checkbox" data-id="${extension.id}" checked>`
      : `<input class="form-check-input mt-0" type="checkbox" data-id="${extension.id}">`}
    </div>    

</div>`});
  }

})