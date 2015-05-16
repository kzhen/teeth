var colorDecay = "#cb3594";
var colorFilling = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";




var curColor = colorDecay;
var clickColor = new Array();
var this_tooth;

var context = document.getElementById('canvas').getContext("2d");
var canvas = document.getElementById('canvas');

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
		
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});



var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
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

function loadCanvas(dataURL, this_canvas) {
  var context = document.getElementById("t1").getContext('2d');

  // load image from data url
  var imageObj = new Image();
  imageObj.onload = function() {
    context.drawImage(this, 0, 0);
  };

  context.scale(0.39,0.39);

  imageObj.src = dataURL;
}

$("#btnDecay").click(function() {
	curColor = colorDecay;
});

$("#btnFilling").click(function() {
	curColor = colorFilling;
});

$(".tooth").click(function() {
	//alert(this.src);

  loadCanvas(export_png(), this_tooth);

  canvas_clear();
  
  var name = "teeth/" + $(this).attr("id") + ".png";
  
$("#canvas").css("background", "url("+name+")");
  this_tooth = this;
});