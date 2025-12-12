# HPLAYER

## Project Setup

- ### Clone Project
```bash
$ git clone https://github.com/hiren3897/hplayer.git
```

- ### Change directory
```bash
cd hplayer
```

- ### Install Global Dependencies
```bash
pnpm install
```

- ### Run the project 
It will start the development environment using `webpack.config.dev.js`
```bash
pnpm start
```

### With Docker

```bash
# BUILD THE IMAGE
docker build -f Dockerfile.dev . -t hplayer:dev

# RUN THE DOCKER CONTAINER
docker run -p 127.0.0.1:8081:8081 hplayer:dev

# This will start the container and map port 3000 on the host to port 8081 in the container. The "-v" flag mounts the current working directory on the host to the "/app" directory inside the container, which allows for live reloading of changes made in the project.
docker run -it --rm -p 8081:8081 -v $(pwd):/app hplayer:dev
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