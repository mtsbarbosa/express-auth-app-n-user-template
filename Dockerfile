FROM node:latest
RUN mkdir -p /opt/work/workspace/express-auth-app-n-user-template
WORKDIR /opt/work/workspace/express-auth-app-n-user-template
COPY package.json /opt/work/workspace/express-auth-app-n-user-template/
RUN npm install
COPY . /opt/work/workspace/express-auth-app-n-user-template
ARG NODE_ENV
ARG NODE_DATABASE_URL
ENV NODE_ENV "$NODE_ENV"
ENV NODE_DATABASE_URL "$NODE_DATABASE_URL"
EXPOSE 3000
CMD npm start
