var n = 7;
let PI = 3.1415;
var theta = PI/4;
var arc_theta = PI;
var r=100;
var r_scale = 50;
var alpha = 150;

var ctr = 0;
var incr = 0.02;
let wX = 800;
let wY = 600;
let ratio = 0.7;
var from, to;
let from_colour, to_colour, bg_colour;


function makeSlider(n, min, max, default_pos, name) {
  let slider;
  slider = createSlider(min, max, default_pos);
  slider.position(wX + 100, 50 * n);
  slider.style('width', '80px');
  text(name, wX + 100, (50 * n) - 20);
  return slider;
}

function setup() {
  // Create canvas based on screensize
  wX = ratio*windowWidth-200;
  wY = ratio*windowHeight;
  createCanvas(wX + 200, wY);

  bg_colour = createColorPicker('#FFFFFF');
  bg_colour.position(wX + 100, 50 * 1);
  incr_slider = makeSlider(2, 1, 50, 20, 'increment');
  depth_slider = makeSlider(3, 2, 15, 7, 'depth');

  from_colour = createColorPicker('#FF4514');
  from_colour.position(wX + 100, 50 * 4);

  to_colour = createColorPicker('#0000FF');
  to_colour.position(wX + 100, 50 * 5);
  //text('VANiLLA Into the Dream',);
}

function weirdfunc(theta) {
  var ans = 1;
  ans = (1 - cos(theta%PI))/2; // Scale from 0 to and "reset" every PI
  ans = ans + floor(theta/PI); // Increase every PI
  return ans;
}

function draw() {
  background(bg_colour.color());
  ctr = ctr+incr_slider.value()/1000;
  from = from_colour.color();
  to = to_colour.color();
  textSize(16);
  fill(0, 102, 153);
  text('Inspired by the album art of: \nVANiLLA Into the Dream', wX + 10, wY - 180, 180, 180);
  textSize(32);
  text('', wX + 10, wY - 150);
  
  translate(wX/2, wY/2);
  rotate(PI);
  translate(-wX/2, -wY/2);
  n = depth_slider.value();
  r = min(wX, wY)/n;
  r_scale = (min(wX, wY) - r)/n;
  var var2 = weirdfunc(ctr);
  for (var i = n; i >= 0; i--) {
    var varr = float(i)/float(n);
    fill(lerpColor(from, to, varr), alpha);
    stroke(lerpColor(from, to, varr), alpha);
    strokeWeight(0);
    arc(wX/2, wY/2, r+i*r_scale, r+i*r_scale, var2*i*theta, (var2*i)*theta + PI);
  }
}
