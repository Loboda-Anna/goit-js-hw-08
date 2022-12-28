import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player('vimeo-player');
const currentTimeData = player
  .getCurrentTime()
  .then(function (seconds) {
    // seconds = the current playback position
  })
  .catch(function (error) {
    // an error occurred
  });

player.on('timeupdate', function getCurrentTimeToLocalStorage(currentTimeData) {
  localStorage.setItem('videoplayer-current-time', currentTimeData);
});

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
console.log(currentTimeData);
console.log(localStorage.getItem('videoplayer-current-time'));
