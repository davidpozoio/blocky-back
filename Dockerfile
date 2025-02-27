FROM node:22-alpine3.19
WORKDIR /home/app
RUN npm install pnpm -g
COPY package.json .
RUN pnpm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start"]