const options = {
  basic: {
    source: 'https://mirror.netcologne.de/CCC/congress/2019/h264-hd/36c3-10561-eng-The_Eye_on_the_Nile.mp4',
  },
  advanced_features: [
    {
      name: 'custom_audio_languages',
      visible: true,
      data: [
        {
          code: 'en',
          url: 'https://mirror.netcologne.de/CCC/congress/2019/h264-hd/36c3-10561-eng-The_Eye_on_the_Nile.mp4',
          default: true
        },
        {
          code: 'fr',
          url: 'https://berlin-ak.ftp.media.ccc.de/congress/2019/h264-hd/36c3-10561-fra-The_Eye_on_the_Nile.mp4',
          default: false
        },
        {
          code: 'de',
          url: 'https://dortmund.media.ccc.de/congress/2019/h264-hd/36c3-10561-deu-The_Eye_on_the_Nile.mp4',
          default: false
        }
      ]
    }
  ]
};
