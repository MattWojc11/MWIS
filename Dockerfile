# Wybierz oficjalny obraz Node.js
FROM node:18

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki `package.json` i `package-lock.json`
COPY package.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj wszystkie pliki projektu
COPY . .

# Zbuduj aplikację Next.js
RUN npm run build

# Ustaw zmienną środowiskową na produkcyjną
ENV NODE_ENV=production

# Otwórz port 3000 (domyślny dla Next.js)
EXPOSE 3001

# Uruchom aplikację
CMD ["npm", "start"]