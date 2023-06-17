const options = {
  basic: {
    source: 'https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
  },
  player_configurations: {
    drm: {
      advanced: {
        'com.widevine.alpha': {
          audioRobustness: 'SW_SECURE_CRYPTO',
          videoRobustness: 'SW_SECURE_CRYPTO'
        }
      }
    }
  },
  advanced_features: [
    {
      name: 'chapters_live',
      visible: true,
      data: {
        chapterMarkerColor: '#099b74',
        startOverChapterOnClick: false,
        seekBarColors: {
          base: 'rgba(169,164,164,0.58)',
          buffered: 'rgba(152,152,152,0.83)',
          played: 'rgba(255,0,23,0.44)'
        },
        chapters: [
          {
            title: 'Chapter 1',
            startTime: 1663218180,
            endTime: 1663218200
          },
          {
            title: 'Chapter 2',
            startTime: 1663218250,
            endTime: 1663218300
          },
          {
            title: 'Chapter 3',
            startTime: 1663218310,
            endTime: 1663218350
          }
        ]
      }
    }]
};

setTimeout(() => {
  hexaPlayer.mute();

  hexaPlayer.controls_.addEventListener('timeandseekrangeupdated', () => {
    const seekRange = hexaPlayer.player_.seekRange();
    hexaPlayer.updateLiveChapters([
      {
        title: 'Chapter 1',
        startTime: Math.round(seekRange.start) + 50,
        endTime: Math.round(seekRange.start) + 100
      },
      {
        title: 'Chapter 2',
        startTime: Math.round(seekRange.start) + 150,
        endTime: Math.round(seekRange.start) + 200
      },
      {
        title: 'Chapter 3',
        startTime: Math.round(seekRange.start) + 210,
        startTimeAsUnitFormat: '16:43:43',
        endTime: Math.round(seekRange.start) + 240
      }
    ], false);
  });
}, 2000);
