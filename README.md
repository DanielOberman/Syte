# Syte

The application is a modern web application written in the TypeScript language.

The client-side application is implemented based on the classic combination of ReactJS + Redux libraries.

The server-side part is presented in a microservices architecture based on the NestJS framework and Mongo-db + TypeORM.

The source code is organized as an [NX](https://nx.dev) monorepository.

## Application launch.

#### Requirements

* _[Node.js версии 16.18.1](https://nodejs.org/download/release/v16.18.1/)_
* Installed and running  [Docker](https://docs.docker.com/engine/install/) service for your platform. (recommended is [Docker Desktop](https://www.docker.com/products/docker-desktop/) for full visual management)

1. Install the required dependencies.

npm install

2. To run the application, you first need to start the database in Docker.

npm run docker:up:db

3. Start the local development server.

npm run start

4. Open localhost
http://localhost:4200/