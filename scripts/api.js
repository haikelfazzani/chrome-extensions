function deleteSelectedObjectsFromCanvas (canvas) {
  canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj)
  });
  canvas.discardActiveObject().renderAll();
}

function exportToIMG (filename = 'untitled.jpeg', type = "image/jpeg") {
  let dataURL = canvas.toDataURL(type, 1.0);
  let a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}