var colorDecay = "#cb3594";
var colorFilling = "#659b41";

var selectedColour = colorDecay;
var clickColor = new Array();
var selectedTooth;

var editorContext = document.getElementById('toothEditorCanvas').getContext("2d");
var editorCanvas = document.getElementById('toothEditorCanvas');

$('#toothEditorCanvas').mousedown(function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#toothEditorCanvas').mousemove(function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#toothEditorCanvas').mouseup(function (e) {
  paint = false;
});

$('#toothEditorCanvas').mouseleave(function (e) {
  paint = false;
});


$('#toothEditorCanvas').on('touchstart', function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#toothEditorCanvas').on('touchmove', function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#toothEditorCanvas').on('touchend', function (e) {
  paint = false;
});




var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(selectedColour);
}

function redraw() {
  //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  editorContext.strokeStyle = "#df4b26";
  editorContext.lineJoin = "round";
  editorContext.lineWidth = 5;

  for (var i = 0; i < clickX.length; i++) {
    editorContext.beginPath();
    if (clickDrag[i] && i) {
      editorContext.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      editorContext.moveTo(clickX[i] - 1, clickY[i]);
    }
    editorContext.lineTo(clickX[i], clickY[i]);
    editorContext.closePath();
    editorContext.strokeStyle = clickColor[i];
    editorContext.stroke();
  }
}

function canvas_clear() {
  editorContext.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
}

function export_png() {
  return editorContext.canvas.toDataURL();
}

function loadCanvas(dataURL, id) {
  var ctx = document.getElementById(id).getContext('2d');

  // load image from data url
  var imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(this, 0, 0);
  };

  imageObj.src = dataURL;
}

$("#btnDecay").click(function () {
  selectedColour = colorDecay;
});

$("#btnFilling").click(function () {
  selectedColour = colorFilling;
});

$(".tooth").click(function () {
  if (selectedTooth != undefined) {
    // Push the current #canvas back into the mouth
    loadCanvas(export_png(), $(selectedTooth).attr("id"));
  }

  $(selectedTooth).removeClass("selectedTooth");
  $(this).addClass("selectedTooth");

  // Copy whatever we've just clicked on into #canvas
  canvas_clear();

  var c = document.getElementById($(this).attr("id"));
  var ctx = c.getContext("2d");

  var imgUrl = ctx.canvas.toDataURL();

  var imageObj = new Image();
  imageObj.onload = function () {
    editorContext.drawImage(this, 0, 0);
  };

  imageObj.src = imgUrl;

  selectedTooth = this;
});

function make_top_teeth(t) {
  var c = document.getElementById("t" + t);
  var ctx = c.getContext("2d");

  var imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(this, 0, 0, 35, 143);
  };
  imageObj.src = "teeth/t" + t + ".png";
}

function make_bottom_teeth(b) {
  var c = document.getElementById("b" + b);
  var ctx = c.getContext("2d");

  var imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(this, 0, 0, 35, 143);
  };
  imageObj.src = "teeth/b" + b + ".png";
}

$(document).ready(function () {

  for (var t = 1; t <= 16; t++) {
    make_top_teeth(t);
    make_bottom_teeth(t);
  }
});

$("#btnRemoveTooth").click(function () {
  $(selectedTooth).hide();
});

