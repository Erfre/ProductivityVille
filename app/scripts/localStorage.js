// The store user function loops through all the player variables and saves them to the local storage
function storeUser(){
  player.population = popCtrl.popList.length;
  var userData = localStorage;
  userData.stored = true;
  for (var variable in player) {
    //checks all the values in player except the functions and arrays and stores them into local storage
    if (typeof player[variable] !== 'function' && player[variable].constructor !== Array) {
      userData[variable] = player[variable];
    }
    else if (player[variable].constructor === Array && player.buildingList.length > 0) {
      //checks for the player array(the array all the buildings are saved in) and makes it into a json string.
      // IDEA mayber this should check the all buildings array to see what buildings there is and build from there.
      userData[variable] = JSON.stringify(player.buildingList,['type','id','x', 'y','cost','level', 'house']);
    }
  }
  // remove comment here to clear the local storage
  ///userData.clear();
}

// This function loads all of the data in the local storage
function loadUser(){
  var userData = localStorage;

  for (var stored in userData) {
    for (var obj in player) {
      // checks if player object exist in the local storage, if it does the value will be replaced with value in local storage.
      if (obj === stored) {
        if (stored === 'buildingList') {
          var built = JSON.parse(userData.getItem('buildingList'));
          for (var i = 0; i < built.length; i++) {
            player[obj].push(built[i].type = new building(
            built[i].type,
            built[i].id,
            built[i].x,
            built[i].y,
            built[i].cost,
            built[i].level));
            addBuilding(built[i].type.type);
          }
        }
        else {
        // else just store the data into the corresponding variable
        player[obj] = parseInt(userData[stored]);
          if (obj === 'population') {
            popCtrl.create(player[obj]);
          }
        }
      }
    }
  }
}
