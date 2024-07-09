FROM node:18-alpine as builder

WORKDIR /react-todo-list
ADD . /react-todo-list
ADD package.json package-lock.json  /react-todo-list/
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=builder /react-todo-list/build /usr/share/nginx/html

