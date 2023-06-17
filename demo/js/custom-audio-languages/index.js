
const getMp4Urls = async() => {
  const responsePhp = await fetch('https://demoplayer.hexaglobe.net/demo/hexa-player-demo/custom-multilang-demo/get-ovp-url.php');
  const data = await responsePhp.json();
  const files = [];
  for (const lang of Object.entries(data.files_by_lang)) {
    files.push({
      code: lang[0],
      url: lang[1].mp4['1080'],
      default: lang[0] === 'en'
    });
  }
  return files;
};
let options = {};
getMp4Urls().then(data => {
  options = {
    basic: {
      source: data[1].url,
    },
    advanced_features: [
      {
        name: 'custom_audio_languages',
        visible: true,
        data: data
      }
    ]
  };
});
