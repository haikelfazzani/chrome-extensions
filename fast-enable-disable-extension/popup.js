window.addEventListener('DOMContentLoaded', () => {

  let btnExtensions = document.getElementById('extensions')
  let ulList = document.getElementById('list')

  if (btnExtensions) {
    btnExtensions.addEventListener('click', () => {
      // id, name, icons, enabled, isApp, description
      let extInfo = {}

      // chrome.management.setEnabled(string id, boolean enabled, function callback)

      chrome.management.getAll(function (result) {

        ulList.innerHTML = ''
        result.forEach(extension => {
          ulList.innerHTML += `      
<div class="list-group-item d-flex justify-content-between align-items-center">
  <p class="m-0">${extension.name} <span class="badge badge-primary">${extension.isApp?'app':'extension'}</span></p>
  <small class="text-muted">      
    ${extension.enabled ?
          `<input class="form-check-input" type="checkbox" data-id="${extension.id}" checked>`
          : `<input class="form-check-input" type="checkbox" data-id="${extension.id}">`}    
  </small>
</div>`});

        let chkkk = document.querySelectorAll('.form-check-input')

        Object.keys(chkkk).forEach(v => {
          chkkk[v].addEventListener('change', (e) => {

            const extensionId = e.target.dataset.id;
            const status = e.target.checked
            chrome.management.setEnabled(extensionId, status, () => {
              console.log('disbaled  : ' + status + ' : ' + extensionId);
            })

          })

        }) // object loop

      }) // end getAll


    })
  }

})