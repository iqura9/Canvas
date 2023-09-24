const drawingCanvas = document.getElementById("canvas");
const context = drawingCanvas.getContext("2d");
const clearDrawingButton = document.getElementById("clear");
const saveDrawingButton = document.getElementById("save");
const restartDrawingButton = document.getElementById("restart");
const drawingImage = document.getElementById("result");
let previousX, previousY;
let isDrawing = false;

const getX = (event) => {
  return event.clientX - getOffsetX(event);
};
const getY = (event) => {
  return event.clientY - getOffsetY(event);
};
const getOffsetX = (event) => {
  return event.pageX - event.offsetX;
};
const getOffsetY = (event) => {
  return event.pageY - event.offsetY;
};

const addDrawingCanvasEventListeners = () => {
  drawingCanvas.addEventListener("mousedown", handleDrawingCanvasMouseDown);
  drawingCanvas.addEventListener("mouseup", handleDrawingCanvasMouseUp);
  drawingCanvas.addEventListener("mousemove", handleDrawingCanvasMouseMove);
  drawingCanvas.addEventListener("mouseleave", handleDrawingCanvasMouseLeave);
  clearDrawingButton.addEventListener("click", clearDrawingCanvas);
  saveDrawingButton.addEventListener("click", saveDrawingCanvasImage);
  restartDrawingButton.addEventListener("click", clearDrawingCanvasFull);
};

const handleDrawingCanvasMouseDown = (event) => {
  isDrawing = true;
  previousX = getX(event);
  previousY = getY(event);
  draw(getX(event), getY(event), isDrawing);
};

const handleDrawingCanvasMouseUp = (event) => {
  isDrawing = false;
  console.log(event);
};

const handleDrawingCanvasMouseMove = (event) => {
  if (isDrawing) draw(getX(event), getY(event), isDrawing);
};

const handleDrawingCanvasMouseLeave = (event) => {
  isDrawing = false;
};

const draw = (x, y, isDrawing) => {
  if (isDrawing) {
    context.beginPath();
    context.strokeStyle = "solid";
    context.lineWidth = 5;
    context.lineJoin = "round";
    context.moveTo(previousX, previousY);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
  }

  previousX = x;
  previousY = y;
};

const clearDrawingCanvas = () => {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};

const clearDrawingCanvasFull = () => {
  window.location.reload();
};

const saveDrawingCanvasImage = () => {
  drawingImage.src = drawingCanvas.toDataURL();
};

export default (function () {
  addDrawingCanvasEventListeners();
})();
