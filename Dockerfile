FROM node:7.1-wheezy
RUN apt-get update && \
    apt-get upgrade -y  && \
    apt-get install -y git build-essential g++ flex bison gperf ruby perl \
  libsqlite3-dev libfontconfig1-dev libicu-dev libfreetype6 libssl-dev \
  libpng-dev libjpeg-dev python libx11-dev libxext-dev
RUN git clone https://github.com/functor-soup/phantom-js-webpage-resource-lister-server.git 
WORKDIR phantom-js-webpage-resource-lister-server/
RUN npm install
EXPOSE 4000
CMD ["npm","start"] 

