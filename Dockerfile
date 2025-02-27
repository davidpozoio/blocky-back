FROM node:22-alpine3.19
WORKDIR /app
RUN npm install pnpm -g
COPY package.json .
RUN pnpm install
EXPOSE 8000
CMD ["pnpm", "run", "start"]