To run Application

```
npm install
npm run dev
```

---

To use docker container

```
docker pull vladprotsenko/movies
```

And to run container

```
docker run --name movies-cont -p 3000:3000 vladprotsenko/movies
```

or if you need to specify url to server

```
docker run --name movies-cont -p 3000:3000 -e API_URL=SERVER_URL_VALUE vladprotsenko/movies
```

[Link to docker img](https://hub.docker.com/r/vladprotsenko/movies)
