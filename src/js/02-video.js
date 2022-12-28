import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const STORAGE_KEY = 'videoplayer-current-time';

const currentTimeData = player
  .getCurrentTime()
  .then(function (seconds) {})
  .catch(function (error) {});

function addCurrentTimeToLocalStorage(currentTimeData) {
  localStorage.setItem(STORAGE_KEY, currentTimeData.seconds);
}

player.on('timeupdate', throttle(addCurrentTimeToLocalStorage, 1000));

player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
    }
  });
