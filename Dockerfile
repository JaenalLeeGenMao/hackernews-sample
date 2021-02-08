FROM node:12-alpine

# Install additional dependencies
RUN apk --no-cache update && apk --no-cache add g++ make bash zlib-dev libpng-dev && rm -fr /var/cache/apk/*

# create & set working directory
RUN mkdir -p /web/hackernews
WORKDIR /web/hackernews

# copy source files
COPY . /web/hackernews

# install dependencies
RUN npm install --production=true

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start