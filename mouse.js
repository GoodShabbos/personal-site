console.log("hi person reading the console");

var clicks = 0;

function clickMe() {
  clicks = clicks + 1;  // make the number go up
  document.getElementById("clicked").innerHTML = "You clicked the button " + clicks + " times";
}


// ========== THE GOOFY MOUSE ==========
// ok so basically he chases your cursor but hes slow and googly
var goofer = document.getElementById("goofer");
var mousehead = document.getElementById("mousehead");
var pupl = document.getElementById("pupl");
var pupr = document.getElementById("pupr");
var bubble = document.getElementById("bubble");

var mx = window.innerWidth / 2, my = window.innerHeight / 2;  // the REAL mouse
var gx = mx, gy = my;  // the goofy mouse (he lags behind because hes goofy)
var frame = 0;

document.addEventListener("mousemove", function (e) {
  mx = e.clientX;
  my = e.clientY;
});

// stuff he leaves on the floor
var trailStuff = ["🧀", "✨", "💫", "🐾"];

function goofyLoop() {
  frame = frame + 1;

  // chase the cursor. 0.15 is the speed of one goofy mouse
  gx = gx + (mx - gx) * 0.15;
  gy = gy + (my - gy) * 0.15;
  var vx = mx - gx;
  var vy = my - gy;
  var speed = Math.sqrt(vx * vx + vy * vy);

  // wobble side to side, way more when hes moving fast. also he breathes
  var wobble = Math.sin(frame / 3) * (2 + Math.min(speed / 4, 28));
  var breathe = 1 + Math.sin(frame / 25) * 0.06;
  mousehead.style.transform = "rotate(" + wobble + "deg) scale(" + breathe + ")";

  goofer.style.left = gx + "px";
  goofer.style.top = gy + "px";

  // googly eyes look where hes headed
  var ex = Math.max(-3, Math.min(3, vx / 10));
  var ey = Math.max(-3, Math.min(3, vy / 10));
  pupl.style.transform = "translate(" + ex + "px, " + ey + "px)";
  pupr.style.transform = "translate(" + ex + "px, " + ey + "px)";

  if (speed > 10 && frame % 5 === 0) dropTrail(gx, gy);

  requestAnimationFrame(goofyLoop);
}

function dropTrail(x, y) {
  var s = document.createElement("span");
  s.className = "trail";
  s.textContent = trailStuff[Math.floor(Math.random() * trailStuff.length)];
  s.style.left = (x + Math.random() * 20 - 10) + "px";
  s.style.top = (y + Math.random() * 20 - 10) + "px";
  document.body.appendChild(s);
  setTimeout(function () { s.remove(); }, 800);
}

goofyLoop();

// he says stuff. i wrote these myself
var phrases = ["weee!!", "hi there", "im the mouse", "got any cheese??", "follow me", "beep boop", "woo hoo", "this is my website now"];
setInterval(function () {
  bubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  bubble.classList.add("show");
  setTimeout(function () { bubble.classList.remove("show"); }, 1400);
}, 6000);

// CHAOS MODE: clicking explodes cheese everywhere
document.addEventListener("click", function (e) {
  for (var i = 0; i < 8; i = i + 1) {
    var c = document.createElement("span");
    c.className = "cheese";
    c.textContent = "🧀";
    c.style.fontSize = (12 + Math.random() * 14) + "px";
    c.style.left = e.clientX + "px";
    c.style.top = e.clientY + "px";
    document.body.appendChild(c);

    var ang = (Math.PI * 2 / 8) * i + Math.random();
    var dist = 50 + Math.random() * 60;
    var dx = Math.cos(ang) * dist;
    var dy = Math.sin(ang) * dist;
    // have to wait a frame or the css transition doesnt happen (weird css thing)
    setTimeout(function (el, ddx, ddy) {
      el.style.transform = "translate(" + ddx + "px, " + ddy + "px) rotate(" + (Math.random() * 360) + "deg)";
      el.style.opacity = "0";
    }, 10, c, dx, dy);
    setTimeout(function (el) { el.remove(); }, 700, c);
  }
});

// OUT OF THIS WORLD (get it??).
function ufoFlyby() {
  var ufo = document.createElement("div");
  ufo.className = "ufo";
  ufo.textContent = "🛸";
  ufo.style.left = "-60px";
  ufo.style.top = (60 + Math.random() * (window.innerHeight - 160)) + "px";
  document.body.appendChild(ufo);
  // small delay or the transition wont run (same weird css thing)
  setTimeout(function () {
    ufo.style.left = (window.innerWidth + 60) + "px";
  }, 30);
  setTimeout(function () { ufo.remove(); }, 4500);
}

setInterval(ufoFlyby, 11000);
ufoFlyby(); // one comes right away to set the mood