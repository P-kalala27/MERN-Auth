FROM node:18-alpine

# Ajout d'un utilisateur non-root pour plus de sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# Copie des fichiers de dépendances
COPY ../package*.json ./

# Installation des dépendances en mode production
RUN npm install --omit=dev

# Copie du reste des fichiers
COPY . .

# Attribution des permissions
RUN chown -R appuser:appgroup /app

# Passage à l'utilisateur non-root
USER appuser

EXPOSE 5000

CMD [ "npm", "run", "server" ]