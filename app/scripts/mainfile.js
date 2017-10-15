// TODO scale with phone user
// TODO add pause when clicking on the screen again

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

// declaring all the variables
var c = document.getElementById('canvas'),
	ctx = c.getContext('2d'),
	canvasWidth = 700,
	canvasHeight = 700,
	displayMsg = false;
    popCtrl.context = ctx;

// the initialize function creating the map and loading eveything from the localstorage, also starts the game loop.
function init() {
  // Remove Event Listener and load images.
  removeEventListener('load', init);


  //Gives the map a width and creates it, also loads all the images
  isometric.width = 20;
  isometric.createMap();
  isometric.loadImg();


  // Loads the user from the localStorage
  if (localStorage.stored) {
    loadUser();
  }


  player.build();
  gameLoop();
};


//Updates the canvas and draws the population, player stats and the clock
function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    popCtrl.update();
    player.drawPlayerStats();

    if (pomodoroBtn.pressed) {
        pomodoroBtn.drawClock(isometric.buildCtx);
    }

    textEvent.showMsg();
};

// The gameloop
function gameLoop() {
    requestAnimationFrame(gameLoop, canvas);
    update();
}

// mouse events
// Getting the mouse position on the canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
// Adds an event to the mousedown(pressing the mouse) which activates the pomodoro timer and saves the user data into the local storage.
buildings.addEventListener('mousedown', function (evt) {
    var mousePos = getMousePos(canvas, evt);

    if (!pomodoroBtn.pressed) {
        pomodoroBtn.pressed = true;
        myWorker.postMessage(pomodoroBtn.state);
    }

    storeUser();
}, false);

addEventListener('load', init, false);

// Text event function displaying a text message onto the screen for a period of time.
var textEvent = {
	text:'String',
	font:'20px Courier New',
	color:'black',
	align:'center',
	x:canvasWidth/2,
	y:canvasWidth/4,
	duration:0,
    drawText: function(){
        ctx.font=this.font;
        ctx.fillStyle= this.color;
        ctx.textAlign= this.align;
        ctx.fillText(text, x, y);
    },
	showMsg: function(){
		if (displayMsg && this.text !== 'string') {
			this.drawText();
			//sets a timeout to make the message dissapear
			setTimeout(function(){displayMsg=false;},this.duration);
		}
	}
}


// This creates a webworker and handles all the messages sent to it. When it receives a message it and updates the state or the time of the pomodoroBtn class
if(window.Worker){
  var myWorker = new Worker('../scripts/timeWorker.js');
  var result;
  myWorker.onmessage = function(e){
    result = e.data;
    if (result == 'active' || result == 'break') {
      pomodoroBtn.state = result;
      pomodoroBtn.clearBtn(isometric.buildCtx, canvasWidth, canvasHeight);
    }
    else {
      //display timer on button
      pomodoroBtn.time = result;
      // Adds the time to the wepage tab
      document.title = pomodoroBtn.state + ' ' + result;
    }
  }
}
else{
  alert('Your browser does not support webworkers, get a better browser...');
}
