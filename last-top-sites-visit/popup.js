document.addEventListener('DOMContentLoaded', function () {
  let ulList = document.getElementById('list');

  chrome.topSites.get(topVisits);

  function topVisits (data) {
    ulList.innerHTML = '';
    data.forEach((site,i) => {
      ulList.innerHTML += `<li>
        <div>
          <span>${i+1}</span> 
          <a href="${site.url}" class="list-group-item">${site.title}</a>
        </div>
        <div>></div>
      </li>`;
    });
  }
});
