To run Application

```
npm install
npm run dev
```

---

To use docker container

[Link to docker img](https://hub.docker.com/r/vladprotsenko/movies)

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

---

also you need run container for back-end server

```
docker pull webbylabhub/movies
docker run --name movies -p 8000:8000 webbylabhub/movies
```

---

По ревʼю відписав [тут](https://docs.google.com/document/d/1SOU8im6uYU9MxhGvC-nivtLPZJTIo9v9LAAHobTCvRg/edit#)
