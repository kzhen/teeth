var colorDecay = "#cb3594";
var colorFilling = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

var curColor = colorDecay;
var clickColor = new Array();
var this_tooth;

var context = document.getElementById('canvas').getContext("2d");
var canvas = document.getElementById('canvas');

$('#canvas').mousedown(function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function (e) {
  paint = false;
});

$('#canvas').mouseleave(function (e) {
  paint = false;
});


$('#canvas').on('touchstart', function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').on('touchmove', function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').on('touchend', function (e) {
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
  clickColor.push(curColor);
}

function redraw() {
  //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for (var i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}

function canvas_clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
}

function export_png() {
  return context.canvas.toDataURL();
}

function loadCanvas(dataURL, id) {
  var context = document.getElementById(id).getContext('2d');

  // load image from data url
  var imageObj = new Image();
  imageObj.onload = function () {
    context.drawImage(this, 0, 0);
  };

  // context.scale(0.63, 0.63);

  imageObj.src = dataURL;
}

$("#btnDecay").click(function () {
  curColor = colorDecay;
});

$("#btnFilling").click(function () {
  curColor = colorFilling;
});

$(".tooth").click(function () {


  if (this_tooth != undefined) {
    // Push the current #canvas back into the mouth
    loadCanvas(export_png(), $(this_tooth).attr("id"));


  }
  $(this_tooth).removeClass("selectedTooth");
  $(this).addClass("selectedTooth");

  // Copy whatever we've just clicked on into #canvas
  canvas_clear();

  var c = document.getElementById($(this).attr("id"));
  var ctx = c.getContext("2d");

  var imgUrl = ctx.canvas.toDataURL();

  var imageObj = new Image();
  imageObj.onload = function () {
    context.drawImage(this, 0, 0);
  };

  //imageObj.src = "teeth/"+$(this).attr("id")+".png";
  imageObj.src = imgUrl;

  this_tooth = this;
});

// $(".tooth123").click(function() {
// 	//alert(this.src);

// 	if (this_tooth != undefined) {
// 		loadCanvas(export_png(), $(this_tooth).attr("id"));
// 	}


// 	canvas_clear();

// 	var name = "teeth/" + $(this).attr("id") + ".png";

// 	$("#canvas").css("background", "url("+name+")");

// 	this_tooth = this;
// });

function make_top_teeth(t) {
  var c = document.getElementById("t" + t);
  var ctx = c.getContext("2d");

  var imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(this, 0, 0);
  };
  imageObj.src = "teeth/t" + t + ".png";
}

function make_bottom_teeth(b) {
  var c = document.getElementById("b" + b);
  var ctx = c.getContext("2d");

  var imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(this, 0, 0);
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
  $(this_tooth).hide();
});

