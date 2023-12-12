FROM node AS prod
WORKDIR /app
COPY package.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY index.html ./
COPY vite.config.ts ./
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=prod /app/build .

# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]