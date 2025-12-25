FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
ARG SERVER_URL_INTERNAL
ENV SERVER_URL_INTERNAL=$SERVER_URL_INTERNAL
RUN npm install
COPY . .
RUN npm run build
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start"]
