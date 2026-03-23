FROM node:latest
WORKDIR /app
COPY . .
RUN npm ci
EXPOSE 3000
CMD ["node", "index.js"]
