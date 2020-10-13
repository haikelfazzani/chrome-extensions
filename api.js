function deleteSelectedObjectsFromCanvas (canvas) {
  canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj)
  });
  canvas.discardActiveObject().renderAll();
}

function exportToIMG () {
  let dataURL = canvas.toDataURL("image/jpeg", 1.0);
  let a = document.createElement('a');
  a.href = dataURL;
  a.download = 'untitled.jpeg';
  document.body.appendChild(a);
  a.click();
}