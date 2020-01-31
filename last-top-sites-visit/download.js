let ulListD = document.getElementById('list-d');

// download : id, filename, state: "complete", exists: true, fileSize: 10219, mime: "application/zip"
chrome.downloads.search({}, (result) => {

  createListDownloads(result, ulListD);

  // remove item from list of downloads
  setTimeout(() => {
    document.querySelectorAll('.btn-remove').forEach(b => {
      b.addEventListener('click', () => {
        let itemId = b.dataset.id;
        chrome.downloads.erase({ id: parseInt(itemId, 10) }, function () {
          document.getElementById(`${itemId}`).style.display = 'none';
        });
      });
    })
  }, 500);

  // open folder    
  setTimeout(() => {
    document.querySelectorAll('.item').forEach(b => {
      b.addEventListener('click', () => {
        let itemId = b.dataset.id;
        chrome.downloads.show(parseInt(itemId, 10));
      });
    })
  }, 500);
});


function createListDownloads (result, ulListD) {
  ulListD.innerHTML = '';
  let slicedRes = result && result.length > 19 ? result.slice(0, 20) : result;
  slicedRes.forEach(element => {
    ulListD.innerHTML += `<li class="list-group-item" id="${element.id}">
        <p class="item" data-id="${element.id}">${getItemName(element.filename)}</p>
        <button class="btn-remove" data-id="${element.id}">REMOVE</button>
      </li>`;
  });
}

// /[^\\.]+(?=\.)/gi : "C:\Users\haike\Downloads\tabCapture.zip" => tabCapture.zip
function getItemName (filename) {
  if (filename && filename.length > 0) {
    filename = String.raw`${filename}`;
    let extFileName = filename.split('\\').reverse()[0];
    if (extFileName && (extFileName !== undefined || extFileName.length > 0)) {
      return extFileName
    }
  }
}
