# Filename: Dockerfile 
# FROM node:12-alpine AS build
# COPY package.json package.lock .
# RUN yarn install
# COPY . .
# RUN yarn build

FROM node:12-alpine
ENV PORT 3000
# ENV NODE_ENV=production

ENV PORT 3000
WORKDIR /app
COPY package*.json /app/
# RUN yarn install
# COPY --from=build /app/dist dist
RUN yarn install --production
COPY . /app
#BUILDING app
RUN yarn add --dev typescript
# RUN yarn add --dev @types/react
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]