let inputColor = '#000';
let activeObject = null;
let pointerEvents = false;
let groupObjects = [];

const canvas = new fabric.Canvas('canvas', { isDrawingMode: false, width: window.innerWidth, height: window.innerHeight });
fabric.Object.prototype.transparentCorners = false;


fabDraw.addEventListener('click', (e) => {
  switch (e.target.dataset.item) {
    case 'text':
      canvas.add(new fabric.Textbox('MyText', {
        fontSize: 16,
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

    case 'arrow':
      let triangle = new fabric.Triangle({
        width: 10,
        height: 15,
        fill: 'black',
        left: 235,
        top: 65,
        angle: 90
      });

      let line = new fabric.Line([50, 100, 200, 100], {
        left: 75,
        top: 70,
        stroke: 'black'
      });

      let objs = [line, triangle];

      let alltogetherObj = new fabric.Group(objs);
      canvas.add(alltogetherObj);
      canvas.requestRenderAll();
      break;

    case 'triangle':
      canvas.add(new fabric.Triangle({
        stroke: '#000', width: 100, height: 100, left: 50, top: 300, fill: '#cca'
      }));
      canvas.requestRenderAll();
      break;

    case 'circle':
      canvas.add(new fabric.Circle({ stroke: '#000', radius: 30, fill: '', top: 100, left: 100 }));
      canvas.requestRenderAll();
      break;

    case 'ellipse':
      canvas.add(new fabric.Ellipse({
        left: 100,
        top: 100,
        stroke: 'black',
        fill: '',
        selectable: true,
        originX: 'center',
        originY: 'center',
        rx: 80,
        ry: 40
      }));
      canvas.requestRenderAll();
      break;

    case 'rectangle':
      canvas.add(new fabric.Rect({
        width: 50, height: 100, left: 275, top: 350, angle: 90,
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

fabTools.addEventListener('click', (e) => {
  switch (e.target.textContent) {
    case 'eraser': // erase only selected elements
      deleteSelectedObjectsFromCanvas(canvas);
      break;

    case 'eraser-all':
      canvas.remove(...canvas.getObjects());
      break;

    case 'interact-page':
      pointerEvents = !pointerEvents;
      document.querySelector('.canvas-container').style.setProperty("pointer-events", (pointerEvents ? 'none' : 'auto'), "important")
      break;

    default:
      break;
  }
});

fabEdit.addEventListener('click', (e) => {
  switch (e.target.dataset.item) {
    case 'drawing':
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 10;
      break;

    case 'move-object':
      canvas.isDrawingMode = false;
      break;

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
  groupObjects = canvas.getActiveObject()._objects;
}

canvas.on('object:added', function (obj) {
  if (!isRedoing) {
    h = [];
  }
  isRedoing = false;
  if(!canvas.isDrawingMode) {
    canvas.centerObject(obj.target);
  }
});

// undo and redo
var isRedoing = false;
var stackState = [];
function undo () {
  if (canvas._objects.length > 0) {
    stackState.push(canvas._objects.pop());
    canvas.renderAll();
  }
}
function redo () {
  if (stackState.length > 0) {
    isRedoing = true;
    canvas.add(stackState.pop());
  }
}

canvas.on({
  'selection:updated': onChangeProp,
  'selection:created': onChangeProp,
  'object:moving': onChange,
  'object:scaling': onChange,
  'object:rotating': onChange,
});

btnFillTransparent.addEventListener('click', (e) => {
  inputColor = e.target.value;
  if (activeObject) {
    activeObject.set({ 'fill': '' });
    canvas.requestRenderAll();
  }
});

inputColorEL.addEventListener('input', (e) => {

  let name = e.target.name;
  inputColor = e.target.value;

  if (activeObject) {
    activeObject.set({ [name]: inputColor });
  }

  if (groupObjects && groupObjects.length > 0) {
    groupObjects.forEach(g => {
      g.set({ [name]: inputColor });    
    });
  }

  if (canvas.isDrawingMode) {
    canvas.freeDrawingBrush.color = inputColor;    
  }

  canvas.requestRenderAll();
});
