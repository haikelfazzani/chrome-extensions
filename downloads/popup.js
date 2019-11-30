document.addEventListener('DOMContentLoaded', function () {

  let ulList = document.getElementById('list')

  // chrome.topSites.get(function (data) {
  //   ulList.innerHTML = ''
  //   data.forEach(element => {
  //     ulList.innerHTML += `
  //         <a href="${element.url}" class="list-group-item">🔗 ${element.title}</a>`
  //   });
  // })

  // download : id, filename, state: "complete", exists: true, fileSize: 10219, mime: "application/zip"
  chrome.downloads.search({}, (result) => {
    ulList.innerHTML = ''
    result = result.slice(0, 10)
    result.forEach(element => {
      ulList.innerHTML += `<li class="list-group-item">🔗 ${getItemName(element.filename)}</li>`
    });

  });

  // filename: "C:\Users\haike\Downloads\tabCapture.zip" => tabCapture
  function getItemName (filename) {
    if (filename) {
      filename = String.raw`${filename}`
      let extFileName = filename.match(/[^\\.]+(?=\.)/gi)[0]
      if (extFileName !== undefined || extFileName.length > 0) {
        return extFileName
      }
    }
  }
})
