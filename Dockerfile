FROM node
WORKDIR /home/app
RUN npm install pnpm -g
COPY package.json .
RUN pnpm install
COPY . .
EXPOSE 8000
CMD ["pnpm", "run", "start"]