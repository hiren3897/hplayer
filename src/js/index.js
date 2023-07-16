import HPlayer from './hPlayer';

const video = document.querySelector('#video');
const videoContainer = document.querySelector('#video-container');
const hPlayer = new HPlayer(video, videoContainer, {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    chaptersData: {
      url: 'https://hplayer-demo.netlify.app/assets/text-track-en.vtt',
      lang: 'en'
    }
  },
  ui_configuration: {
    addBigPlayButton: true,
    enableTooltips: true
  },
  player_configurations: {
    drm: {
      advanced: {
        'com.widevine.alpha': {
          audioRobustness: 'SW_SECURE_CRYPTO',
          videoRobustness: 'SW_SECURE_CRYPTO'
        }
      }
    },
  },
  advanced_features: [
    {
      name: 'time_tooltip',
      visible: true,
    },
  ]
});

hPlayer.init_();
hPlayer.mute();
window.player = hPlayer;

setTimeout(async() => {
  console.log(hPlayer.player_.getConfiguration());
  console.log(hPlayer.player_.seekRange());
}, 1500);
