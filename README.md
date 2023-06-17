# HEXAGLOBE SHAKA PLAYER

## Project Setup

- ### Clone Project
```bash
$ git clone ssh://git@kvasir.hexaglobe.net:2222/advanced-suite/front/hexa-player.git
```

- ### Change directory
```bash
cd Hexa-Player
```

- ### Install Hexaglobe Dependencies
```bash
npm install @advanced-suite/front-shaka-player --registry https://lofn.hexaglobe.net
```

- ### Install Global Dependencies
```bash
npm install
```

- ### Run the project 
It will start the development environment using `webpack.config.dev.js`
```bash
npm start
```

### With Docker

```bash
# BUILD THE IMAGE
docker build -f Dockerfile.dev . -t hexa-player:dev

# RUN THE DOCKER CONTAINER
docker run -p 127.0.0.1:8081:8081 hexa-player:dev

# This will start the container and map port 3000 on the host to port 8081 in the container. The "-v" flag mounts the current working directory on the host to the "/app" directory inside the container, which allows for live reloading of changes made in the project.
docker run -it --rm -p 8081:8081 -v $(pwd):/app hexa-player:dev
```
    
### Build the project
#### Development Build
```
npm run build-dev
```

#### Production Build
```bash
npm run build-prod
```

### How to add your demo page on the demo site
 Reference => [demo folder](./demo)
 
Create your own player directory in `demo/js` directory and write your player options in `index.js` and configurations as done in demo for any feature.
 
 - For example see
    - JS [backward button feature](demo/js/backward-button/index.js)

- Configure `webpack.config.demo.js`
    - Edit `featureList`
        - ```js
          const featureList = [
            {
              name: 'yourPlayerName',
              adoc: '"include::./docs/yourDoc.adoc[]"'
            }
          ]
            ```
        - Edit [index.html](demo/index.html) add a link to your demo page under a card section by copy pasting the code.
            - ```html
              <a href="./yourPlayerName.html">YOUR player name</a>
                ```

- Build the project - `npm run build-prod`
- Start the demo - `npm run demo`

# Demo Examples
#### [Basic player setup](docs/demo-examples/demo-basic.adoc)

#### [Live player setup](docs/demo-examples/demo-livePlayer.adoc)

#### [HLS FairPlay setup](docs/demo-examples/demo-hlsfairplay.adoc)

## Configuration's
Configuration includes all property types that will be used to set up the player like 
DRM configurations, ABR, Customised UI config and advanced hexaglobe features.

### Player Config
- [Hexaglobe player configurations](docs/features-configuration/player.adoc)
### UI Config
- [Hexaglobe UI configurations](docs/features-configuration/features.adoc)

### Advanced Features Config
- [Hexaglobe advanced](docs/features-configuration/hexaglobe-advanced-features)

### Basic usage
- [Hexaglobe player basic](docs/features-configuration/basic.adoc)

### DRM configurations
- [DRM config](docs/features-configuration/drmConfigurations.adoc)

## [Pre-prod demo site](https://develop-player-demo.hexaglobe.net/)

- ### Available features
  - #### Presentation
    - Poster
    - Big Play Button
    - Thumbnail Track Live `advanced feature`
    - Thumbnail Track VOD `advanced feature`
    - Chapters VOD `advanced feature`
    - Chapters Live `advanced feature`
    - Subtitles
    - Picture-in-Picture
    - Auto Picture-in-Picture `advanced feature`
    - Pop-up-list `advanced feature`
    - Image Overlay `advanced feature`
    - Manage Alerts `advanced feature`
    - Volume Vertical
    - Context menu
  - #### Live Player Features
    - Small live button
    - Big live button `advanced feature`
    - DVR mode button `advanced feature`
  - #### Manage Playback
    - Backward Button
    - Forward Button
    - Playback Speed
    - Express Mode `advanced feature`
    - Rewind
    - Fast Forward
    - Loop
    - Keyboard Support
  - #### Miscellaneous
    - ChromeCast
    - AirPlay
    - Share Button `advanced feature`
    - ScreenShot `advanced feature`
  - #### Manage Sources
    - Playlist `advanced feature`
    - Switch Channel `advanced feature`
    - Redirect `advanced feature`
    - Language Support
    - Quality
    - Statistics
  - #### Explícit Features
    - [Multiplayer](https://develop-player-demo.hexaglobe.net/multiplayer.html)
    - [Mini-player](https://develop-player-demo.hexaglobe.net/mini-player.html)
    - [Notification's](https://develop-player-demo.hexaglobe.net/notification.html) - Now send notifications in the player.
