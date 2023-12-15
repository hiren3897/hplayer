const options = {
  basic: {
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://picsum.photos/640/360'
  },
  advanced_features: [
    {
      name: 'image_overlay',
      visible: true,
      data: {
        imageUrls: [
          'assets/transparent_image3.png',
          'assets/transparent_image4.png'
        ]
      }
    }
  ]
};
