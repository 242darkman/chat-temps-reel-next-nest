# Messagerie chat intégrant du temps réel
 ## Technos utilisées :
 > * NextJS v14.0.3
 > * NestJS v10
 > * Socket IO Client  v4.7.2
 > * Tailwindcss v3.3
 > * React icons v4.12.0
 > * OpenAI v4.20.1


## Contributeur :
> Brandon VOUVOU 

Les dossiers `api-chat-real-time` et `chat-real-time` correspondent respectivement au backend et au frontend

  ## Installation des dépendances
  ### Backend et Frontend
```bash
npm install
```
  ### Lancer l'API
```bash
npm run start:dev
```
Une fois executé, notre application est disponible à l'adresse `http://localhost:8001`

  ### Lancer le client
```bash
npm run dev
```
L'application est disponible sur `http://localhost:3000`


> Il faudra renseigner dans le fichier d'environnement de l'API, la clé `OPENAI_API_KEY`

  ## Fonctionnalités :
1. **Communication temps réel** entre deux utilisateurs
2. L'utilisateur peut envoyer un message déjà traduit dans la langue de son choix
3. L'utilisateur peut aussi traduire les messages qu'il a reçu d'un utilisateur. La traduction des messages reçus peut être multiple.
4. L'utilisateur a la possibilité de checker la véracité d'une information d'un message particulier qu'il a reçu. **ON NE PEUT VERIFIER UNE INFORMATION QUE POUR UN MESSAGE**
5. Des réponses lui sont suggérés en fonction du contexte de la conversation et du dernier message reçu. Pour voir les suggestions de réponses il faudrait placer le curseur dans la zone de saisie ensuite un volet s'affichera, ensuite l'utilisateur pourra faire son choix.
