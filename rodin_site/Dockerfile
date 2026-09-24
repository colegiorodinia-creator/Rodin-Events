FROM node:22-alpine

WORKDIR /app

# Instala as depend?ncias
COPY package*.json ./
RUN npm install

# Copia o resto do c?digo
COPY . .

# Faz o build do Next.js
RUN npm run build

# Exp?e a porta que o Coolify espera
EXPOSE 3000

# Inicia o servidor
CMD ["npm", "run", "start"]
