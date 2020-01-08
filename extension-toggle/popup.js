window.addEventListener('load', () => {

  var filterInput = document.getElementById('filter');
  

  // id, name, icons, enabled, isApp, description
  chrome.management.getAll(getAll);

  function getAll (extensionsList) {
    filterInput.addEventListener('keyup', (e) => {
      let newResult = extensionsList.filter(r => r.name.toLowerCase().includes((e.target.value).toLowerCase()))
      createList(newResult && newResult.length > 0 ? newResult : extensionsList);
      enableDisableExt(getCheckInputs(), extensionsList);
    });

    createList(extensionsList);
    enableDisableExt(getCheckInputs());


    // safe uninstall extension
    document.querySelectorAll('.btn-danger').forEach(b=>{
      b.addEventListener('click',()=>{
        const extensionId = b.getAttribute('data-id');
        chrome.management.uninstall(extensionId, {showConfirmDialog:true}, ()=>{
          void chrome.runtime.lastError;
        })

      })
    })
  }; // end getAll
});
