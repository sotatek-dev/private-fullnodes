FROM node:8.16.0-jessie-slim

#Install deps
RUN apt-get update
RUN apt-get install -y git-core \
      wget

RUN wget -q -O /tmp/libpng12.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng/libpng12-0_1.2.54-1ubuntu1_amd64.deb \
      && dpkg -i /tmp/libpng12.deb \
      && rm /tmp/libpng12.deb

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb
RUN dpkg -i dumb-init_*.deb

# Install omni explorer
WORKDIR /home/ubuntu

ARG OMNILAYER_VERSION=08ad012fcebee20368a6b9c801e69f48bd5e6c45
RUN git clone https://github.com/OmniLayer/omniexplorer.git
WORKDIR /home/ubuntu/omniexplorer

RUN git checkout ${OMNILAYER_VERSION}

RUN npm install

# Patch several files
COPY constants.js /home/ubuntu/omniexplorer/app/containers/App/constants.js
COPY header.jsx /home/ubuntu/omniexplorer/app/components/Header/index.jsx
COPY addDevMiddlewares.js /home/ubuntu/omniexplorer/server/middlewares/addDevMiddlewares.js

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["npm", "run", "start:prod"]
