//                            this side is numbers in array
//                          _________
//                          \         \   this side is number of arrays
//                           \         \
//                            \         \
//                             \_________\

// This is the isometric class, which cotains alll the variables and methods to create the isometric look of the map.
var isometric = {
  width:0,
  map:[],
  heightMap:[],
  freeTiles:[],
  tileGraphicsToLoad:['../images/grass-boxtest2.png','../images/tube-bot.png', '../images/tube-mid.png','../images/tube-top.png','../images/pcb-bot.png','../images/pcb-mid.png','../images/pcb-top.png','../images/temple-bot.png','../images/temple-mid.png','../images/temple-top.png'],
  topBox:[],
  midBox:[],
  botBox:[],
  tileGraphics:[],
  tileGraphicsLoaded:0,
  // Set as your tile pixel sizes, alter if you are using larger tiles.
  tileH:13,
  tileW:25,
  // mapX and mapY are offsets allowing easy positioning of the map
  mapX:350,
  mapY:200,
  xCoord:[],
  yCoord:[],
  //context as properties so they may be used to draw something else on.
  mapCtx:document.getElementById('main').getContext('2d'),
  buildCtx:document.getElementById('buildings').getContext('2d'),
  // This method scans the map matrix and finds the location of all free tiles(0's)
  scanTiles:function(map){
    //Seems not to be working TODO kinda works
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.width; j++) {
        if (this.map[i][j] === 0){
          this.freeTiles.push({x:i,y:j});
        }
      }
    }
  },
  // This method creates the map matrix and populates all the available tiles with 0's and puts negative values on each edge of the map. These negative values are used for the population movement.
  createMap:function(){
    //at end of map I have to set invisible tiles which population can collision with.
    for (var i = 0; i < this.width; i++) {
      this.map.push([]);
      this.heightMap.push([]);
      for (var j = 0; j < this.width; j++) {
        if (i === 0) {
          //top left
          this.map[i].push(-1);
        }
        else if (i === this.width-1) {
          //bot right
            this.map[i].push(-3);
        }
        else if (j === this.width-1) {
          //bot left
          this.map[i].push(-2);
        }
        else if (j === 0) {
          //top right
          this.map[i].push(-4);
        }
        else {
          this.map[i].push(0);
          this.heightMap[i].push(0);
        }
      }
    }

  },

  //This loads all the .png files which are found in the tileGraphicsToLoad. It also sorts the building sprites into 3 different arrays, topBox midBox botBox. The sorting removes .png and looks at the last character in the file name to determine where it belongs(if it ends with a t its the bot part if d its mid if p its top)
  loadImg:function (){
    // This loads the tiles and then the boxes which are used to display height, all objects which will have a box object must be placed at the same index
    for (var i = 0; i < this.tileGraphicsToLoad.length; i++) {
      //find the words last character - 5, p d t
      var buildType = this.tileGraphicsToLoad[i].length - 5;
      //loading the Image as a new tile and puts in an array depending on what tile it is
      var newTile = new Image();
      newTile.src = this.tileGraphicsToLoad[i];
      newTile.onload = function(){
          //BUG here a weird thing happening.
          // Why do I have to use isometric here?
        isometric.tileGraphicsLoaded++;
        if (isometric.tileGraphicsLoaded == isometric.tileGraphicsToLoad.length) {
          //draws all the buildings when loaded
          isometric.drawMap();
          isometric.drawBuildings();
        }
      }
      // The sorting of the building blocks
      if (this.tileGraphicsToLoad[i][buildType] === 'p')
          this.topBox.push(newTile);
      else if (this.tileGraphicsToLoad[i][buildType] === 'd')
          this.midBox.push(newTile);
      else if (this.tileGraphicsToLoad[i][buildType] === 't')
          this.botBox.push(newTile);
      else
        // put it into the normal tiles, used for grass etc
        this.tileGraphics.push(newTile);
    }
  },
  // drawMap does exacty what the name implies. It draws the grass tiles onto all of the 0's in the map matrix
  drawMap:function () {
    var mapHeight;
    for (var i = 0; i < this.map.length; i++) {
      for (var j = 0; j < this.map.length; j++) {
      this.xCoord.push((i - j) * this.tileH + this.mapX);
      this.yCoord.push((i + j) * this.tileH / 2 + this.mapY);
      this.mapCtx.drawImage(this.tileGraphics[0],(i - j) * this.tileH + this.mapX, (i + j) * this.tileH / 2 + this.mapY);
      }
    }
  },
  // Draws all the buildings onto the map. Does this by looping through the whole map matrix aswell as the map height matrix. Then depending on how tall the building is on the height matrix it adds a botbox, midboxes and topbox
  drawBuildings: function (){

        this.buildCtx.clearRect(0,0,canvasWidth,canvasHeight);

        var drawTile, mapHeight,boxId;

        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map.length; j++) {
              	//identifying what tile to draw
              	drawTile = this.map[i][j];
                //height of the tile
                mapHeight = this.heightMap[i][j];
                //drawtile - 1 because 0 is ground.
                boxId = drawTile - 1;
                if (drawTile > 0) {
                    for (var c = 1; c <= mapHeight; c++) {
                        if (c <= 1) {
                          this.buildCtx.drawImage(this.botBox[boxId],(i - j) * this.tileH + this.mapX, (i + j) * this.tileH / 2 + this.mapY - (this.tileH*c));
                        }
                        else if (c > 1 && c < mapHeight) {
                          this.buildCtx.drawImage(this.midBox[boxId],(i - j) * this.tileH + this.mapX, (i + j) * this.tileH / 2 + this.mapY - (this.tileH*c));
                        }
                        else if (c === mapHeight) {
                          this.buildCtx.drawImage(this.topBox[boxId],(i - j) * this.tileH + this.mapX, (i + j) * this.tileH / 2 + this.mapY - (this.tileH*c));
                        }
                    }
                }
            }
        }
    }
};
