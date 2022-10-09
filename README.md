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

how to set it up in server (portainer)
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
docker login 
pull code from docker hub using portainer
docker.io/miftahalrasyid/diginote-odc-telkom-docker:latest

check docker storage space
docker system df

https://www.youtube.com/watch?v=FMncgtivhSw

docker run -it --name paperlessodc --platform linux/arm64/v8 -p 3000:3000 miftahalrasyid/diginote-odc-telkom-docker:latest

docker buildx create --use

docker-compose up (using docker-compose.yml)


https://jitsu.com/blog/multi-platform-docker-builds

to copy the name of the image into the same name of the repository on docker hub

docker tag <name of current REPOSITORY>:<TAG> <name of the docker username>/<name of the images>

then

docker push <name of the docker username>/<name of the images>:<TAG>

https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/

### working docker build
docker buildx build --platform linux/amd64,linux/arm64 -t miftahalrasyid/diginote-odc-telkom-docker --push .

create docker instance 

docker buildx create 

use next@v12.2.4-canary.9 for traceable image-optimizer module next js
use node:node:18-alpine for less issues than 16-alpine (support image-optimizer nextjs)

next.config.js for older next js version to generate standalone folder on .next
experimental: {
    outputStandalone: true,
},

nextjs guide using docker 
https://nextjs.org/docs/deployment

restart php 
systemctl restart php7.4-fpm
folder yang diexecute di fpm

setting client_max_body_size di segment http pada file nginx.conf
service nginx restart

to get docker image root document
use:
docker image inspect miftahalrasyid/diginote-odc-telkom-docker
use "merged" label

install ssl into portainer 
sudo certbot -d portainer.odc-sakti.id

portainer buffer
"MergedDir": "/var/lib/docker/overlay2/6d38c7c8f3cc435e2ee097d4051e2cf87bb9d65fa001ad2e8fc42b4e900678d1/merged",

diginote odc buffer 
"MergedDir": "/var/lib/docker/overlay2/b3dd7ddd6839513cde899f27a529639b090f180f43ff8dacb721dd11a30cb8bf/merged",

run portainer

docker run -d -p 127.0.0.1:8000:8000 -p 127.0.0.1:9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

normal
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

nginx configuration

server {
        root /var/lib/docker/overlay2/6d38c7c8f3cc435e2ee097d4051e2cf87bb9d65fa001ad2e8fc42b4e900678d1/merged;
        server_name portainer.odc-sakti.id;
        location / {
                proxy_pass http://127.0.0.1:9000;
        }

}
server {
        root /var/lib/docker/overlay2/b3dd7ddd6839513cde899f27a529639b090f180f43ff8dacb721dd11a30cb8bf/merged;

        server_name odc-sakti.id *.odc-sakti.id www.odc-sakti.id portainer.odc-sakti.id;

        location /_next/static {
                proxy_pass http://localhost:3000;
                expires 30d;
                access_log on;
        }

        location / {
                if ( $host = www.odc-sakti.id ) {
                        set $a 3000;
                }

                if ( $host = odc-sakti.id ) {
                        set $a 3000;
                }

                if ( $host = portainer.odc-sakti.id ) {
                        set $a 9000;
                }
                proxy_pass http://localhost:$a;
                proxy_buffering off;
                proxy_redirect off;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-Host $server_name;
                #proxy_set_header X-Forwarded-For $remote_addr;
                #proxy_set_header X-Forwarded-Proto $scheme;
                #proxy_cache_bypass $http_upgrade;
                #rewrite ^/next$ / break;               
        }
}

## Nginx setting ssl

