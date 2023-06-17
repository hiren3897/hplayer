const demoList = [
  {
    type: 'DASH VOD with Thumbnails',
    config: {
      source: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_with_4_tiles_thumbnails.mpd',
      withWebVtt: false
    }
  },
  {
    type: 'DASH VOD with WebVTT',
    config: {
      source: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
      withWebVtt: true,
    }
  },
  {
    type: 'HLS VOD with WebVTT',
    config: {
      source: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      withWebVtt: true,
    }
  }
];

const selector = document.querySelector('.video-list');
for (const [index, type] of demoList.entries()) {
  const html = `
    <option id="${type.type}" sourceUrl="${type.config.source}"
    withWebVtt=${type.config?.withWebVtt}>${type.type}</option>
  `;
  selector.insertAdjacentHTML('afterbegin', html);
}
document.querySelector('.video-list').addEventListener('change', function() {
  const selectedDemo = this.querySelector(`[id='${this.value}']`);

  if (this.value.includes('WebVTT')) {
    hexaPlayer.loadAssets_({
      basic: {
        source: selectedDemo.getAttribute('sourceUrl')
      },
      advanced_features: [
        {
          name: 'thumbnail_track_vod',
          visible: true,
          data: {
            withWebVtt: selectedDemo.getAttribute('withWebVtt').includes('true'),
            webVttInfo: {
              url: 'https://test-drm.hexaglobe.net/hrathod/thumbtest/webvtt/thumbs.vtt',
              mimeType: '',
            }
          }
        }
      ]
    });
  } else {
    hexaPlayer.loadAssets_({
      basic: {
        source: selectedDemo.getAttribute('sourceUrl')
      },
      advanced_features: [
        {
          name: 'thumbnail_track_vod',
          visible: true,
          data: {
            withWebVtt: selectedDemo.getAttribute('withWebVtt').includes('true')
          }
        }
      ]
    });
  }
});
