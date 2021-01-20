# Micro-Service Renting

**Renting** : location de films \\
Il permet d’accéder aux locations de films de l’utilisateur et d’en louer de nouveaux. Permet également à un administrateur d’obtenir des statistiques sur les locations, et à un bot de générer des rapports mensuels.

## Database 

### Utilisation de la database 

### Requêtes  

GET \\
endpoint : renting \\

Renvoie les films loués par l’utilisateur authentifié.

GET with movieId \\
endpoint : renting/rent \\

Renvoie un lien vers l’URL de paiement permettant de louer le film donné pour l’utilisateur authentifié.