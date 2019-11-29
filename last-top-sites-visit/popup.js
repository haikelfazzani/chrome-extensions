document.addEventListener('DOMContentLoaded', function () {

  let btnTopSites = document.getElementById('top-sites')
  let ulList = document.getElementById('list')

  if (btnTopSites) {
    btnTopSites.addEventListener('click', () => {
      chrome.topSites.get(function (data) {
        ulList.innerHTML = ''
        data.forEach(element => {
          ulList.innerHTML += `
          <a href="${element.url}" class="list-group-item">🔗 ${element.title}</a>`          
        });
      })
    })
  }

})
