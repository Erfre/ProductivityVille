// The population class
function folk(x,y,id,height,width){
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.speedX = 1;
	this.speedY = 1;
	this.id = id;
	this.walkedTiles = 0,
	this.switchDir = 0;
	this.tileX = 0,
	this.tileY = 0;
};
// The drawing method, filling out each individual with a white body and a turqousish head.
folk.prototype.draw = function(context){
	// every one have the same color, the only thing that differs the folk is the body size
	let headX, headY, headWidht, headHeight;
	context.fillStyle = 'white';
	context.fillRect(this.x, this.y,this.width,this.height);

	headWidht = this.width/2;
	headHeight = this.height/2;
	context.fillStyle = '#00aecc';
	context.fillRect(this.x + headWidht/2, this.y,headWidht,headHeight);
};

// Determines how they move around in the city, this is determined by keeping track of how many tiles they have moved and if they are headed into the "invisible wall" around the map. If they have walked a certain number of tiles they get a new random direction, if they hit the walls they go the opposite direction to get away.
folk.prototype.move = function(context){

	let x = Math.floor(this.x + this.speedX),
	 	y = Math.floor(this.y + this.speedY),
		newSpeed = 0.1,
		isoX = Math.floor(this.x),
		isoY = Math.floor(this.y);
	// Changing the direction randomly after a certain number of tiles have been crossed, and resets the walked tiles and gives it a new value before it will do this again.
	if (this.walkedTiles >= this.switchDir) {

		this.speedX = Math.random() > 0.5 ? newSpeed:-newSpeed;
		this.speedY = Math.random() > 0.5 ? newSpeed:-newSpeed;

		this.walkedTiles = 0;
		this.switchDir = (Math.floor(Math.random()* Math.pow(isometric.width, 2)/20 + 20));
	}

	for (var i = 0; i < isometric.map.length; i++)
	{
		for (var j = 0; j < isometric.map.length; j++)
		{
			let xC = (i-j) * isometric.tileH + isometric.mapX,
				yC = (i+j) * isometric.tileH/2 + isometric.mapY;

			// here I get the position of the character and saves the last position and then check if the position is whitin the range of any of the tiles and if it steps on a new tile the value is saved and  walkedtiles is increased
			if (isoX <= (xC+isometric.tileW) && isoX >= xC
			&&  isoY <= (yC + isometric.tileH/2) && isoY >= yC) {
				if (this.tileX !== i) {
					this.walkedTiles++;
					this.tileX = i;
				}
				else if(this.tileY !== j){
					this.walkedTiles++;
					this.tileY = j;
				}
			}

			//Collision checking, checks if the current individual is moving into a "invisible wall" if so changes the movement.
			if (x <= (xC + isometric.tileW) && x >= xC
			&&  y <= (yC + isometric.tileH/2) && y >= yC)
			{

				switch (isometric.map[i][j]) {
					case -1:
					this.speedX = newSpeed;
					this.speedY = newSpeed;
						break;
					case -2:
					this.speedX = newSpeed;
					this.speedY = -newSpeed;
						break;
					case -3:
					this.speedX = -newSpeed;
					this.speedY = -newSpeed;
						break;
					case -4:
					this.speedX = -newSpeed;
					this.speedY = newSpeed;
						break;
					default:
					// should something be added here?
				}
			}
		}
	}
	// Updates the speed and draws
	this.x += this.speedX;
	this.y += this.speedY;
	this.draw(context);
}

// The population controller which updates the movement of the population and also spawns the population onto the map at random location. And lastly increases the population with the level of the building
var popCtrl = {
	popList:[],
	context: 'canvas',
	update:function(){
		for (var i = 0; i < this.popList.length; i++) {
			this.popList[i].move(this.context);
		}
	},
	create:function(population){
		for(var i = 0; i < population ; i++) {
			let xSpawn = Math.floor(isometric.width/2 + isometric.mapX),
			ySpawn = isometric.mapY + isometric.mapY/2;
			this.popList.push(new folk(xSpawn, ySpawn, i,Math.ceil((Math.random() + 1) * 5),Math.ceil((Math.random() + 1) * 3)));
		}
	},
	increase: function(buildingLevel){
		let weight;
		weight = (0.5 * buildingLevel);
		this.create(weight);
	}
};
