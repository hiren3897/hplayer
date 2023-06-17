const fullscreenButton = document.createElement('button');
fullscreenButton.classList.add('hexa-fullscreen-btn');
const fullscreenIcon = document.createElement('span');
fullscreenIcon.classList.add('material-icons');
fullscreenIcon.textContent = 'fullscreen';
fullscreenIcon.style.color = '#131413';
fullscreenButton.appendChild(fullscreenIcon);

document.addEventListener('fullscreenchange', () => {
  const parentVideoContainer = document.querySelector('#parent-multiplayer');
  if (document.fullscreenElement) {
    parentVideoContainer.classList.add('hexa-onfullscreen');
    fullscreenIcon.textContent = 'fullscreen_exit';
  } else {
    parentVideoContainer.classList.remove('hexa-onfullscreen');
    fullscreenIcon.textContent = 'fullscreen';
  }
});

const tokens = ['flux1', 'flux2', 'flux3'];
// awaits for the player to be loaded
setTimeout(() => {
  const players = {
    video: hexaPlayer,
    video1: hexaPlayer1,
    video2: hexaPlayer2,
    video3: hexaPlayer3
  };

  // pre-set the resolution for small video containers
  hexaPlayer1.setLowQualityResolution();
  hexaPlayer2.setLowQualityResolution();
  hexaPlayer3.setLowQualityResolution();

  const allVideoContainer = document.querySelectorAll('.shaka-video-container');
  for (const container of allVideoContainer) {
    container.addEventListener('click', (e) => {
      const mainDiv = document.querySelector('.flux0');
      // on click switch the video container
      onClickSwitchVideo(container);
      // Manage the resolution for main and small container's
      for (const [key, videoCard] of Object.entries(players)) {
        if (container.getElementsByTagName('video')[0].classList[0] === key) {
          if (players[key].video_.currentTime <= players[key].player_.seekRange().end - 9) {
            players[key].player_.goToLive();
          }
          players[key].setHighQualityResolution();
        }
        // if again it clicked on the main video maintain the resolution same.
        if (container.getElementsByTagName('video')[0].classList[0] === mainDiv.getElementsByTagName('video')[0].classList[0]) {
          break;
        }
        if (mainDiv.getElementsByTagName('video')[0].classList[0] === key) {
          players[key].setLowQualityResolution();
        }
      }
    });
  }
});

const multiPlayerContainer = document.querySelector('#parent-multiplayer');
multiPlayerContainer.appendChild(fullscreenButton);

fullscreenButton.onclick = () => {
  if (document.fullscreenElement) {
    unsetFullscreen();
  } else {
    setFullscreen();
  }
};

const onClickSwitchVideo = (container) => {
  let fluxClassName;
  if (container.classList.contains('flux0')) return;
  for (const token of tokens) {
    if (container.classList.contains(token)) {
      fluxClassName = token;
    }
  }
  container.classList.remove(`${fluxClassName}`);
  const mainDiv = document.querySelector('.flux0');
  mainDiv.classList.remove('flux0');
  mainDiv.getElementsByTagName('video')[0].muted = true;
  // if video is paused play
  if (mainDiv.getElementsByTagName('video')[0].paused) {
    mainDiv.getElementsByTagName('video')[0].play();
  }
  mainDiv.classList.add(`${fluxClassName}`);
  manageControlsOfPlayer(mainDiv, 'none', 'none');
  container.classList.add('flux0');
  manageControlsOfPlayer(container, 'all', 'block');
  container.getElementsByTagName('video')[0].muted = false;
};

const manageControlsOfPlayer = (element, pointerEvents, display) => {
  const shakaControlsContainer = element.querySelector('.shaka-controls-container');
  const shakaBottomControl = element.querySelector('.shaka-bottom-controls');
  shakaControlsContainer.style.pointerEvents = `${pointerEvents}`;
  shakaBottomControl.style.display = `${display}`;
};

function setFullscreen() {
  const fullscreenElement = document.getElementById('parent-multiplayer');
  if (fullscreenElement.requestFullscreen) {
    fullscreenElement.requestFullscreen();
  } else if (fullscreenElement.webkitRequestFullscreen) {
    fullscreenElement.webkitRequestFullscreen();
  } else if (fullscreenElement.mozRequestFullScreen) {
    fullscreenElement.mozRequestFullScreen();
  } else if (fullscreenElement.msRequestFullscreen) {
    fullscreenElement.msRequestFullscreen();
  }
}

function unsetFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Switch Multiplayer Layouts code
 */
const cssClass = ['bottomFlux2', 'bottomFlux3', 'bottomFlux4'];
const multiplayerContainer = document.querySelectorAll('.multiplayer-container>div');
const layer3 = document.getElementById('layer3');
layer3.onclick = () => {
  for (const player of multiplayerContainer) {
    player.style.display = 'block';
    if (player.classList.contains('flux3')) {
      player.style.display = 'none';
    }
    for (const layerClass of cssClass) {
      if (player.classList.contains(layerClass)) { player.classList.remove(layerClass); }
    }
    player.classList.add('bottomFlux3');
  }
};

const layer2 = document.getElementById('layer2');
layer2.onclick = () => {
  for (const player of multiplayerContainer) {
    player.style.display = 'block';
    if (player.classList.contains('flux3') || player.classList.contains('flux2')) {
      player.style.display = 'none';
    }
    for (const layerClass of cssClass) {
      if (player.classList.contains(layerClass)) { player.classList.remove(layerClass); }
    }
    player.classList.add('bottomFlux2');
  }
};

const layer4 = document.getElementById('layer4');
layer4.onclick = () => {
  for (const player of multiplayerContainer) {
    player.style.display = 'block';
    for (const layerClass of cssClass) {
      if (player.classList.contains(layerClass)) { player.classList.remove(layerClass); }
    }
    player.classList.add('bottomFlux4');
  }
};
