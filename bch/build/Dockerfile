FROM ubuntu:18.04

ARG WORK_DIR=/var/www/node
RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

RUN apt-get update

RUN apt-get install -y git

RUN apt-get install -y build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils \
    libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev \
    libdb-dev libdb++-dev libminiupnpc-dev libzmq3-dev

RUN git clone https://github.com/valbergconsulting/bitcore-abc
WORKDIR ${WORK_DIR}/bitcore-abc
RUN git checkout 0.20.4-bitcore

RUN ./autogen.sh
RUN ./configure --enable-debug

RUN make src/bitcoind

CMD [ "./src/bitcoind" , "--version" ]