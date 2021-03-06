
function Box(label_x, label_y) {
 this.c = document.createElement('canvas');
 this.ctx = this.c.getContext('2d');
 
 this.data = {
  'dimension':{'w':100,'h':100},
  'zoom':{'x':1,'y':1},
  'translate':{'x':0,'y':0},
  'range':{
    'x':{
      'min':0,
      'max':100
    },
    'y':{
      'min':0,
      'max':100
    }
  },
  'label':{'x':label_x,'y':label_y}
 }
}

// centerOnValue(val) // takes the value, and places it in the center of the canvas, scaled so that it goes from (0,0) to (cx, cy)



Box.prototype.returnCanvas = function() {
 return this.c;
}

Box.prototype.border = function(x) {
 this.c.style.border = x;
}

Box.prototype.dimension = function(w, h) {
 this.data.dimension.w = w;
 this.data.dimension.h = h; 
 this.c.width = this.data.dimension.w;
 this.c.height = this.data.dimension.h;
}

Box.prototype.zoom = function(zx, zy) {
 this.data.zoom.x = zx;
 this.data.zoom.y = zy;
}

Box.prototype.translate = function(x, y) {
 this.data.translate.x = x;
 this.data.translate.y = y; 
}

Box.prototype.rangex = function(min, max) {
 this.data.range.x.min = min;
 this.data.range.x.max = max;
 this.data.range.x.span = max-min;

 this.data.zoom.x = this.data.dimension.w / this.data.range.x.span;
 this.data.translate.x = -this.data.range.x.min;
}

Box.prototype.rangey = function(min, max) {
 this.data.range.y.min = min;
 this.data.range.y.max = max;
 this.data.range.y.span = max-min;

 this.data.zoom.y = this.data.dimension.h / this.data.range.y.span;
 this.data.translate.y = -this.data.range.y.min;
}

Box.prototype.VAL2PIXEL = function(val) {
 return {
  'x':(val.x+this.data.translate.x)*this.data.zoom.x,
  'y':this.data.dimension.h - (val.y+this.data.translate.y)*this.data.zoom.y
 }
}

Box.prototype.PIXEL2VAL = function(pixel) {
 return {
  'x':(pixel.x/this.data.zoom.x)-this.data.translate.x,
  'y':(this.data.dimension.h-pixel.y)/this.data.zoom.y-this.data.translate.y
 }
}

Box.prototype.clear = function() {
 this.ctx.fillStyle = '#fff';
 this.ctx.beginPath();
 this.ctx.rect(0, 0, this.data.dimension.w, this.data.dimension.h);
 this.ctx.fill();
}

Box.prototype.SHOWGRIDX = function(dx) {

 if (!arguments[0]) {
   dx = 50* this.data.range.x.span / this.data.dimension.w; // default is 25 px
 }

 for (let x = -dx; x > this.data.range.x.min; x -= dx) {
   let val0 = {'x':x,'y':this.data.range.y.min};
   let val1 = {'x':x,'y':this.data.range.y.max};
   this.CONNECTVALUES(val0, val1, '#ddd');
 }

 for (let x = 0; x < this.data.range.x.max; x += dx) {
   let val0 = {'x':x,'y':this.data.range.y.min};
   let val1 = {'x':x,'y':this.data.range.y.max};
   this.CONNECTVALUES(val0, val1, '#ddd');
 }


};

Box.prototype.SHOWGRIDY = function(dy) {

 if (!arguments[0]) {
   dy = 50* this.data.range.y.span / this.data.dimension.h; // default is 25 px
 }

 for (let y = -dy; y > this.data.range.y.min; y -= dy) {
   let val0 = {'x':this.data.range.x.min,'y':y};
   let val1 = {'x':this.data.range.x.max,'y':y};
   this.CONNECTVALUES(val0, val1, '#ddd');
 }

 for (let y = 0; y < this.data.range.y.max; y += dy) {
   let val0 = {'x':this.data.range.x.min,'y':y};
   let val1 = {'x':this.data.range.x.max,'y':y};
   this.CONNECTVALUES(val0, val1, '#ddd');
 }


};



Box.prototype.showAxes = function(fontSize) {

 this.ctx.strokeStyle = '#333';
 
 this.ctx.beginPath();
 this.ctx.moveTo((0+this.data.translate.x)*this.data.zoom.x, 0);
 this.ctx.lineTo((0+this.data.translate.x)*this.data.zoom.x, this.data.dimension.h);
 this.ctx.stroke();
 
 // X AXIS LABEL
 this.ctx.fillStyle = '#333';
this.ctx.font = (fontSize || this.data.dimension.w/100*3.5) + 'px Monospace';
 this.ctx.textAlign = "right";
 this.ctx.fillText(this.data.label.y, this.data.translate.x*this.data.zoom.x-this.data.dimension.w/100, this.data.translate.x*this.data.zoom.x);

 // X AXIS
 this.ctx.beginPath();
 this.ctx.moveTo(0, this.data.dimension.h-(0+this.data.translate.y)*this.data.zoom.y);
 this.ctx.lineTo(this.data.dimension.w, this.data.dimension.h-(0+this.data.translate.y)*this.data.zoom.y);
 this.ctx.stroke();
 
 // X AXIS LABEL
 this.ctx.fillStyle = '#333';
 this.ctx.font = (fontSize || this.data.dimension.w/100*3.5) + 'px Monospace';
 this.ctx.fillText(this.data.label.x, this.data.dimension.w-(0+this.data.translate.x)*this.data.zoom.x, this.data.dimension.h-(0+this.data.translate.y)*this.data.zoom.y + this.data.dimension.w/100*3.5);
}

Box.prototype.SHOWVALUE = function(val, colorstring, rx) {

 let pixel = this.VAL2PIXEL(val);

 this.ctx.fillStyle = colorstring;
 this.ctx.beginPath();
 this.ctx.arc(pixel.x, pixel.y, rx, 0, 2*Math.PI);
 this.ctx.fill();

}

Box.prototype.CONNECTVALUES = function(val0, val1, colorstring, linewidth) {

 let pixel0 = this.VAL2PIXEL(val0);
 let pixel1 = this.VAL2PIXEL(val1);

 this.ctx.lineWidth = (linewidth || 1);
 this.ctx.strokeStyle = colorstring;
 this.ctx.beginPath();
 this.ctx.moveTo(pixel0.x, pixel0.y);
 this.ctx.lineTo(pixel1.x, pixel1.y);
 this.ctx.stroke();
}