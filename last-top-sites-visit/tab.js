const btnTabs = document.querySelectorAll('.tabs>button');
const tabsItems = document.querySelectorAll('.tabs-items>ul');

let tabId = '';

btnTabs.forEach(btn => {

  btn.addEventListener('click', () => {
    tabId = btn.id;

    tabsItems.forEach(tab => {
      tab.style.display = 'none';
      let tabItemId = tab.getAttribute('data-id');
      if (tabItemId === tabId) {
        tab.style.display = 'block';
      }
    })
  })

})