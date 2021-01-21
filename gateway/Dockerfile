FROM node:14-alpine

# Set app basepath
ENV HOME=/home/app

# Add app dependencies
COPY package.json $HOME/node/
COPY package-lock.json $HOME/node/

# Change working dir and install deps in quiet mode
WORKDIR $HOME/node
RUN npm ci -q

# Copy all app files
COPY . $HOME/node/

EXPOSE 8080
EXPOSE 9876

ENV NODE_ENV=production

CMD ["node", "."]
