#!/usr/bin/env bash

docker build -t bch-build .
docker rm bch || true
docker create --name bch bch-build:latest
docker cp bch:/var/www/node/bitcore-abc/src/bitcoind bitcoincashd
