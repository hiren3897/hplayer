// Minimize button in the player.
const minimizeButton = document.createElement('button');
minimizeButton.classList.add('hexa-minimize-button');
const minimizeIcon = document.createElement('span');
minimizeIcon.classList.add('material-icons');
minimizeIcon.classList.add('md-25');
minimizeIcon.textContent = 'minimize';
minimizeButton.appendChild(minimizeIcon);
minimizeButton.setAttribute('aria-label', 'Hide Mini Player');
minimizeButton.setAttribute('title', 'Hide Mini Player');

// Open Mini player when minimized
const openMiniPlayerButton = document.createElement('button');
openMiniPlayerButton.classList.add('hexa-open-mini-player-button');
const openIcon = document.createElement('span');
openIcon.classList.add('material-icons');
openIcon.classList.add('md-25');
openIcon.textContent = 'open_in_full';
openMiniPlayerButton.appendChild(openIcon);
openMiniPlayerButton.setAttribute('aria-label', 'Open Mini Player');
openMiniPlayerButton.setAttribute('title', 'Open Mini Player');

setTimeout(() => {
// Append minimize button in shaka controls button panel
  const controlButtonPanel = hexaPlayer.controls_.getControlsContainer().children[2].children[1];
  controlButtonPanel.appendChild(minimizeButton);

  // On minimize hide the video, should we pause or mute the player??
  minimizeButton.onclick = () => {
    hexaPlayer.controls_.getVideoContainer().style.display = 'none';
    document.body.appendChild(openMiniPlayerButton);
  };

  // On open display the mini player and remove the open button.
  openMiniPlayerButton.onclick = () => {
    hexaPlayer.controls_.getVideoContainer().style.display = 'block';
    document.body.removeChild(openMiniPlayerButton);
  };
});
