FROM node:latest

RUN yum install -y wget
RUN wget http://www.imagemagick.org/download/linux/CentOS/x86_64/ImageMagick-6.9.3-4.x86_64.rpm
RUN rpm -Uvh ImageMagick-6.9.3-4.i386.rpm

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 5001
CMD [ "npm", "start" ]