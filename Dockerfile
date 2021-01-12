FROM node:10.14.1-alpine as node

RUN npm install -g @angular/cli@7.1.4
RUN npm install -g typescript@3.1.6

WORKDIR /source
COPY package*.json ./

RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . .
RUN ng build --aot --prod

# Stage 2
FROM nginx:1.13.12-alpine
COPY --from=node /source/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf