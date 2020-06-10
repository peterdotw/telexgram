# telexgram

Best chat app in the universe.

## Built With

- [Next.js](https://nextjs.org/) - React Framework
- [Express](https://expressjs.com/) - Framework for Node.js
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Socket.IO](https://socket.io/) - Used for chat and counter of users online
- [Passport.js](http://www.passportjs.org/) - Used for authentication
- [Styled Components](https://www.styled-components.com/) - Used for styling

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Node.js

MongoDB Server

### Installing

Clone a repository:

```
git clone https://github.com/peterdotw/telexgram.git
```

Rename .env.example file to .env and add your credentials to .env file:

```
cd telexgram
mv .env.example .env
```

Install all dependencies:

```
npm install
```

Build an app:

```
npm run build
```

Lastly run the server:

```
npm start
```

## Note about deployed app

Heroku always puts the server to sleep after 30 minutes of last activity so it can load 1-2 minutes at the first time You visit my app on Heroku.
