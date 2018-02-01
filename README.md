# Intelup

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing and production purposes.

### Prerequisites

* [MongoDB](https://www.mongodb.com/download-center?jmp=homepage#community) **For development purposes**
* [Nodejs && NPM](https://nodejs.org/) - **For development purposes**
* [Docker](https://www.docker.com/get-docker) - **For production purposes**
* [Compose](https://docs.docker.com/compose/install/#install-compose) - **For production purposes**

### Installing

A step by step that gets your devlopment environment running:

Install project dependencies:

```sh
npm install
```

## Env
Rename .env.example to .env:

```sh
mv .env.example .env
```

## Running the tests

Use the test script to run the tests:
```sh
npm run test
```
Use this script to run live tests:
```sh
npm run test:live
```

## Running with Docker

Starting the project running in docker with docker-compose

**Make sure the two containers (database and API) ports aren't being used by something else**
```sh
docker-compose up -d
```


## Docs

There is a Swagger API documentation in ./docs/swagger to import at swagger editor

## Built With

* [Express](http://www.expressjs.com/) - The framework used

* [MongoDB](https://www.mongodb.com/) - The famous NoSQL database

* [Mongoose](http://mongoosejs.com) - The MongoDB object modeling for node.js

* [Json Web Token](https://jwt.io/) - A compact and self-contained way for securely transmitting information



## Author

* **[Douglas E. Alves](https://github.com/dougtq)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details