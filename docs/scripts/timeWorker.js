//Web worker
//using a webworker to keep the timer counting when you are not on the page

// Sets a interval which communicates and sends the time to the pomodoro class. When time reaches zero the interval is clear and the state of the pomodoro class changes, either to pomodoro or rest

// webworker starting timer depending on message sent to it. Sending back time + what state the watch is in
onmessage = function(e){
  switch (e.data) {
    // When you have had your break the timer starts at 25 minutes. Sends the break state when finished.
    case 'active':
    var minute = 25, seconds = 0;
    postMessage(minute + ':' + seconds);
      var pomodoroTimer = setInterval(function () {
        if (minute == 0 && seconds == 0) {
          clearInterval(pomodoroTimer);
          postMessage('break');

        }
        else if (seconds == 0) {
          minute--;
          seconds = 59;
        }
        else {
          seconds--;
        }
        //update the clock
        if (seconds < 10) {
          postMessage(minute + ':' + '0' + seconds);
        }
        else {
          postMessage(minute + ':' + seconds);
        }
      }, 1000);
      break;
    // When you have a break the timer is set to 5 minutes
    case 'break':
      var minute = 5, seconds = 0;
      postMessage(minute + ':' + seconds);
        var breakTimer = setInterval(function () {
          if (minute == 0 && seconds == 0) {
            postMessage('active');
            clearInterval(breakTimer);
          }
           else if (seconds == 0) {
            minute--;
            seconds = 59;
          }
          else {
            seconds--;
          }
          if (seconds < 10) {
            postMessage(minute + ':' + '0' + seconds);
          }
          else {
            postMessage(minute + ':' + seconds);
          }
        }, 1000);
      break;
      // case 'pause':
      //     // if paused send back minutes and seconds
      //   break;
  }
}
