document.addEventListener('DOMContentLoaded', function () {
  let ulList = document.getElementById('list');

  chrome.topSites.get(topVisits);

  function topVisits (data) {
    ulList.innerHTML = '';
    data.forEach((site, i) => {
      ulList.innerHTML += createLi(i, site.url, site.title);
    });
  }

  function createLi (idx, url, title) {
    return `<li>
    <div>
      <span>${idx + 1}</span> 
      <a href="${url}" target="_blank" class="list-group-item">${title}</a>
    </div>
    <div>></div>
    </li>`;
  }
});
