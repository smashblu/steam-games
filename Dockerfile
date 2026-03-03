FROM node:latest AS base
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
EXPOSE 3000
CMD ["node", "index.js"]