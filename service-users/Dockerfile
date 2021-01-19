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

# Compile typescript and build all production stuff
RUN npm run build

# Remove dev dependencies that are not needed in production
RUN npm prune --production

EXPOSE 3000

# ENV NODE_ENV=production
ENV NODE_ENV=staging

CMD ["node", "./build"]
