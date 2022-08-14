FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV API_URL=http://localhost:8000/api/v1/
EXPOSE 3000
CMD ["npm", "run", "dev"]
