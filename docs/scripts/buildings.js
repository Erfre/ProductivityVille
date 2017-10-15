//building class
function building(type, id, x, y, cost, level) {
	this.type = type;
	this.id = id;
	this.x = x;
	this.y = y;
	this.cost = cost;
	this.level = level;
	this.house = 0;
	// TODO maybe add images to the building class
}
// when having a lot of objects the prototype is much better because it will be shared between all objects instead of all objects having the same method
building.prototype.buildHouse = function(){
	if (player.pomodoros >= this.cost) {
		//scans the map to find the free tiles
		isometric.scanTiles();
		if (isometric.scanTiles.length > 0) {
			this.house++;
			// Gets a random free position
			let pos = Math.floor(Math.random() * isometric.freeTiles.length);
			// displays the text message
			displayMsg = true;
			textEvent.text ='You\'ve constructed: ' + this.type;
			textEvent.duration = 4000;
			this.x = isometric.freeTiles[pos].x;
			this.y = isometric.freeTiles[pos].y;
			// Pushes it into the buildin class
			player.buildingList.push(this);
			player.pomodoros-= this.cost;
			// maybe house is built first and then pop is increased
			// popCtrl.increase();
			this.levelUp();
		}
	}
	else {
		displayMsg = true;
		textEvent.text = 'not enough pomodoros';
		textEvent.duration = 4000;
	}
};
//When the building is upgraded it levels up!
building.prototype.levelUp = function(){
	if (player.pomodoros >= this.cost) {
		this.level++;
		player.pomodoros-= this.cost;

		player.totLvlCalc();
		//scaling cost
		this.cost += Math.ceil((this.cost * this.level/2) / this.level);
		//shows the level and displays the text event
		displayMsg = true;
		textEvent.text = this.type + ' ' + this.house + ' is now lvl:' + this.level;
		textEvent.duration = 4000;
		//updates the population
		popCtrl.increase(this.level);
	}
	else {
		displayMsg = true;
		textEvent.text = 'Not enough pomodoros, you have to work more';
		textEvent.duration = 4000;
	}
};

// here I try to find the building with the lowest level/height
function lowestBuilding(arr,group){
	if (arr[0] !== undefined) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].type === group && arr[i].level < 5) {
				return i;
			}
		}
	}
	else {
		return false;
	}
}
// this function either upgrades the lowest building or it just creates a totally new building
function constructBuilding(){
	let i, pos, house;
	var idType;
	i = player.buildingList.length +1;
	// pos returns the index of the building in the buildinglist array
	// whenever this is used insidie here it will be the buttons name
	pos = lowestBuilding(player.buildingList, this.id)
	house = player.buildingList[pos];
	if (typeof pos === 'number') {
		// add the levelUp and check what position the house is at in the playerBuildinglist array
		if (house.level < 5) {
			// levels the buildling
			house.levelUp();
			// why do I clear the tiles?
			// isometric.freeTilse = [];
			if (house.level >= 5) {
				//save id
				idType = house.id;
				// here I create a new building with the same id as the last one
				let newBuilding = new building(this.id, idType,0,0,1,0)
				newBuilding.buildHouse();

			}
		}
	}
	else {
		//Creates a totally new building
		let newBuilding = new building(this.id, i, 0,0,1,0);
		newBuilding.buildHouse();
	}
	//Draws the new buildings and saves the changes into localstorage
	player.build();
	storeUser();
}

// maps the object and searches for the key to see if it exist.
// map creates a new array with the result of calling the function. IndexOf tries to find the index of desierd thing wihtin that array. If it exist it will return true if not the value of indexOf will be -1 and return false
function include(array,thing,obj){
	// console.log(typeof arr);
	if (obj) {
		return array.map(function(e){return	e.type;}).indexOf(thing);
	}
	else {
		return (array.indexOf(thing) != -1);
	}
};

// add a onclick event which runs the addBuilding function.
document.getElementById('newBuilding').onclick = addBuilding;

//This function creates a button for the newbuildings and also adds the constructBuilding function to that button. Which gives each new button the possibility to either build a new house or just upgrade old houses.
function addBuilding(name){
	//  here a check is needed to see if there is any buttons with the same name
	// see if there exist another house with the same name if so dont create a new button. Also save the buttonList in local storage
		let saveName;
		if (typeof name === 'object') {
			name = document.getElementById('buildingName').value;
		}
		// makes the save name into a string so it will be used correctly in inlculde function, which checks if there already exists a string with the same name, if so it wont make a new button. This is also called during the loadUser and the buttonlist will be emtpy so it will not make any duplicates.
		saveName = JSON.stringify(name);
		// console.log(include(buttonList,saveName));
		if (!include(buttonList, saveName) || buttonList.length === 0) {
			let button, btnTxt, targetDiv, addFunc;
			targetDiv = document.getElementById('buildingBtn');

			// Creates a new button
			button = document.createElement('button');
			// Here is the id of the button set to the name the player chooses.
			button.id = name;
			button.setAttribute('class', 'houseBtn');
			btnTxt = document.createTextNode(name);
			// adds the text to the newly created button
			button.appendChild(btnTxt);
			//puts the new button into the targetedDiv
			targetDiv.appendChild(button);
			//  here I add a onclick function to it so it will create a new building or just upgrade one of the exisiting ones
			document.getElementById(button.id).onclick = constructBuilding;
			// pushes the button into the buttonlist array where it will be checked for duplicates
			buttonList.push(saveName);
		}
};
// http://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function
