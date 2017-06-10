// The player class, keeping track of all the different stats for the player(Level, "pomodoros", population and buildings). Also have 3 methods totLvlCalc which calculates the total level for the player, the build method which places all the buildings onto the map and then draws them. And at last we have the draw playerstats which mostly have been used for debugging.
var player = {
	// working: false,
	buildingList: [],
	pomodoros: 0,
	totPom: 0,
	pause: 0,
	totLvl:0,
	population: 0,
	totLvlCalc: function(){
		this.totLvl = 0;
		for (var i = 0; i < this.buildingList.length; i++) {
			this.totLvl += this.buildingList[i].level;
		}
	},
	build: function(){
		//places all the buildings and draws
		for (var i = 0; i < this.buildingList.length; i++) {
			var x = this.buildingList[i].x,
			y = this.buildingList[i].y;
			// makes sure the building id is within the range of the images which are created
			if (this.buildingList[i].id > 3) {
				this.buildingList[i].id = Math.floor(Math.random() * 3 + 1);
			}
			isometric.map[x][y] = this.buildingList[i].id;
			isometric.heightMap[x][y] = this.buildingList[i].level;
		}
		isometric.drawBuildings();
	},
	drawPlayerStats: function () {
		// mostly used for error checking
		ctx.font = '15px Courier New';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'left';
		ctx.fillText('Pomodoros: ' + this.pomodoros, 10, 100);
		ctx.fillText('Breaks: ' + this.pause, 10, 130);
		ctx.fillText('Population: ' + popCtrl.popList.length, 10, 160);
		ctx.fillText('buildings: ' + this.buildingList.length, 10, 190);
		ctx.fillText('TotalLevel: ' + this.totLvl, 10, 220);
	}
};
