This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Thanks to 
https://github.com/kirill-konshin/next-redux-wrapper/issues/270
https://github.com/kirill-konshin/next-redux-wrapper#getstaticprops

## About this project

it is build in next js framework.
the idea of this webapps is to reorganize and digitize networking cable tray. this are include splitting, naming, and checking the network cable.

### Security

i use restful API arhitectural model for building this site so it can communicate with further frontend tech that will implements afterwards.

#### CSRF 
in this project, i use jwt token to prevent csrf attack. the token are implemented on Bearer token inside every POST request. so, i hope that no unauthorize action will pass the token screening process.

### Page Render Method / Data Fetching Scheme

unlike react js, next js are server side rendering. so the page already been rendered in the server then push it into the client view.

pm2 start npm --name ditinote-odc-telkom -- start -- -p 3000

pm2 stop

### docker settings
https://dev.to/kumareth/next-js-docker-made-easy-2bok

how to set it up in server
https://docs.docker.com/engine/install/ubuntu/
https://semuada.com/articles/geek/231-cara-install-docker-di-ubuntu-20-04-focal-fossa

push and pull docker 
https://www.youtube.com/watch?v=EIHY_CY5J0k

Dockerfile
.dockerignore

docker build . 

DOCKER_BUILDKIT=1
to make sure it only override the file that change. not entire project

details on building docker 
https://stackoverflow.com/questions/59615266/super-slow-docker-build

login docker from terminal
docker login docker.io

check docker storage space
docker system df

https://www.youtube.com/watch?v=FMncgtivhSw

docker run -it --name paperlessodc --platform linux/arm64/v8 -p 3000:3000 miftahalrasyid/diginote-odc-telkom-docker:latest

docker buildx create --use

docker-compose up (using docker-compose.yml)


#--push for pushing to the docker.io
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t miftahalrasyid/diginote-odc-telkom-docker:latest --push .
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v8 -t miftahalrasyid/diginote-odc-telkom-docker:latest --push .
docker buildx build --platform linux/amd64,linux/arm64,linux/arm64/v8 -t miftahalrasyid/diginote-odc-telkom-docker:latest --push .

https://jitsu.com/blog/multi-platform-docker-builds
