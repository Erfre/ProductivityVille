// The array in which all the buttons for the houses are saved
var buttonList = [];

//TODO Fix a better position for the pomodoro button, and make it clearar what it does
// also make the timer different
//might want to replace the sound.
var gong = new Audio('../gongTest.mp3'),
	pomodoroBtn = {
	x: 350,
	y: 500,
	time:0,	//this is for the worker to fill in
	pressed: false,
	radius: 10,
	color: '#4DBD33',
	state:'active',//this should be the state in which the timer is in
	min:0,
	sec:0,
	//This function draws the clock onto the screens
	drawClock: function(canvas) {
		canvas.clearRect(0,0,750,750);
		let x = 200,
		    y = 200;
		this.drawImage(canvas, '../images/' + this.state + '.png',x,y);
		this.drawText(canvas,this.time, 350, 252 );
	},
	drawImage: function(canvas,img,x,y){
		let newImg = new Image;
		newImg.src = img;
		canvas.drawImage(newImg,x,y);
	},
	// plays sound and clears the canvas
	clearBtn: function(canvas, clearX, clearY){
		gong.play();
		pomodoroBtn.pressed = false;
		canvas.clearRect(0,0,clearX,clearY);
		if (player.buildingList.length > 0) {
			isometric.drawBuildings();
		}
	},
	drawText: function(ctx,text,x,y){
		ctx.font='40px Bungee Shade';
		ctx.fillStyle= 'black';
		ctx.textAlign= 'center';
		ctx.fillText(text, x, y);
	}
};
