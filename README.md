================================ BACKEND ===================================

l'usage de se fichier est dans le bus de m'aider lors de ma revision du code hors le commentaire dans le code qui aide aussi mais la simple manoiere serais de creer se fichier qui va expliquer chaque partie et son utilité:
dans le dossier backend se trouve :
0) le fichier server.js est le point d'etre de notre server || app
1) le dossier config:
    contient la configuration de connexion a la base de donnée MongoDB
2) le dossier controller :
    contient le comportement de l'utilisateur
3) le dossier middleware :
    contient la definition des erreurs tel que pour le 404 et autre type d'erreur de l'utilisateur lié au cote front et a la base de donnée MongoDB;
    contient le fichier authMiddleware pour la protection de cookies && proteger la route dans le sans ou sans connexion on a pas access a  certain route
4) le dossier router :
    contient tout le chemin de connexion et les differents methode de l'api qui sont:
    *POST   /api/users : pour la conexion
    *POST   /api/users/logout : pour la deconnexion de l'utilisateur
    *POST   /api/users/auth: pour le jeton d'authentication
    *GET    /api/users/profile: pour obtenir le profile d'un utilisateur
    *PUT    /api/users/profile: pour la modification du profile de l'utilisateur
5) le dossier Model :
    contient la creation du user et le hashage de son mot de passe avec bcryptjs
6) le dossier utils :
    contient la methode pour la creation du token

pour finir o=il faut rendre le fichier server capable d'exploiter le dist qui est notre ficier d'etre 

 if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist'))); : rendre le ficier dist static.
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend','dist',
     'index.html')));: pour toute requete ne contenant pas de /api/users. utiliser la page index.html


     
} et nous pouvons demarrer l'application à partir du backend soit le port 5000;