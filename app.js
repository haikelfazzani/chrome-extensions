let inputColor = '#000';
let activeObject = null;

const canvas = new fabric.Canvas('canvas', { width: 600, height: 500 });
fabric.Object.prototype.transparentCorners = false;

document.getElementById('fab-draw').addEventListener('click', (e) => {
  switch (e.target.textContent) {
    case 'text':
      canvas.add(new fabric.Textbox('MyText', {
        fontSize: 14,
        left: 20,
        top: 20,
        textAlign: 'center'
      }));
      canvas.requestRenderAll();
      break;

    case 'line':
      canvas.add(new fabric.Line([50, 10, 200, 150], {
        stroke: 'black',
        strokeWidth: 1,
        hasControls: true,
        hasRotatingPoint: true,
        left: 80,
        top: 80
      }));
      canvas.requestRenderAll();
      break;

    case 'triangle':
      canvas.add(new fabric.Triangle({
        stroke: '#000', width: 100, height: 100, left: 50, top: 300, fill: '#cca'
      }));
      canvas.requestRenderAll();
      break;

    case 'circle':
      canvas.add(new fabric.Circle({ stroke: '#000', radius: 30, fill: '#f55', top: 100, left: 100 }));

      // canvas.item(0).set({
      //   borderColor: 'red',
      //   cornerColor: 'green',
      //   cornerSize: 6,
      //   transparentCorners: false
      // });
      // canvas.setActiveObject(canvas.item(0));
      // // this.__canvases.push(canvas);
      canvas.requestRenderAll();
      break;

    case 'rectangle':
      canvas.add(new fabric.Rect({
        width: 50, height: 100, left: 275, top: 350, angle: 45,
        stroke: '#000',
        strokeWidth: 1,
        fill: 'rgba(0,0,200,0.5)'
      }));
      canvas.requestRenderAll();
      break;

    case 'octagon':
      let size = 150;
      let side = Math.round((size * Math.sqrt(2)) / (2 + Math.sqrt(2)));
      let octagon = new fabric.Polygon([
        { x: -side / 2, y: size / 2 },
        { x: side / 2, y: size / 2 },
        { x: size / 2, y: side / 2 },
        { x: size / 2, y: -side / 2 },
        { x: side / 2, y: -size / 2 },
        { x: -side / 2, y: -size / 2 },
        { x: -size / 2, y: -side / 2 },
        { x: -size / 2, y: side / 2 }], {
        fill: 'rgba(0,0,200,0.5)',
        stroke: 'black',
        left: 10,
        top: 10,
        strokeWidth: 1,
        strokeLineJoin: 'bevil'
      }, false);
      canvas.add(octagon);
      canvas.requestRenderAll();
      break;

    case 'emerald':
      let emerald = new fabric.Polygon([{ x: 850, y: 75 }, { x: 958, y: 137.5 }, { x: 958, y: 262.5 }, { x: 850, y: 325 }, { x: 742, y: 262.5 }, { x: 742, y: 137.5 }], {
        fill: 'rgba(0,0,200,0.5)',
        stroke: 'black',
        left: 10,
        top: 10,
        strokeWidth: 1
      }, false);
      canvas.add(emerald);
      canvas.requestRenderAll();
      break;

    case 'star':
      let star = new fabric.Polygon([{ x: 350, y: 75 }, { x: 380, y: 160 }, { x: 470, y: 160 }, { x: 400, y: 215 }, { x: 423, y: 301 }, { x: 350, y: 250 }, { x: 277, y: 301 }, { x: 303, y: 215 }, { x: 231, y: 161 }, { x: 321, y: 161 }], {
        fill: 'rgba(0,0,200,0.5)',
        stroke: 'black',
        left: 10,
        top: 10,
        strokeWidth: 1
      }, false);
      canvas.add(star);
      canvas.requestRenderAll();
      break;

    default:
      break;
  }
});

document.getElementById('fab-tools').addEventListener('click', (e) => {
  switch (e.target.textContent) {
    case 'eraser': // erase only selected elements
      deleteSelectedObjectsFromCanvas(canvas);
      break;

    case 'eraser-all':

      break;


    default:
      break;
  }
});

document.getElementById('fab-edit').addEventListener('click', (e) => {
  switch (e.target.textContent) {
    case 'export':
      exportToIMG();
      break;

    default:
      break;
  }
});

function onChange (options) {
  options.target.setCoords();
  canvas.forEachObject(function (obj) {
    if (obj === options.target) return;
    obj.set('opacity', options.target.intersectsWithObject(obj) ? 0.5 : 1);
  });
}

function onChangeProp (e) {
  activeObject = e.target;
  activeObject = canvas.getActiveObjects()[0];
}

canvas.on({
  'selection:updated': onChangeProp,
  'selection:created': onChangeProp,
  'object:moving': onChange,
  'object:scaling': onChange,
  'object:rotating': onChange,
});

document.getElementById('fill-transparent').addEventListener('click', (e) => {
  if (activeObject) {
    inputColor = e.target.value;
    activeObject.set({ 'fill': '' });
    canvas.requestRenderAll();
  }
});

document.getElementById('input-color').addEventListener('input', (e) => {
  if (activeObject) {
    inputColor = e.target.value;
    activeObject.set({ 'fill': inputColor });
    canvas.requestRenderAll();
  }
});