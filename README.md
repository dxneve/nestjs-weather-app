# Weather API

A NestJS application to fetch and store weather data from the OpenWeatherMap API using PostgreSQL.

## Description

This project demonstrates a weather data service built with [Nest](https://github.com/nestjs/nest) framework, using TypeORM for database interactions, Axios for HTTP requests, and Swagger for API documentation.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running with Docker

To run the application inside Docker containers:

```bash
$ docker-compose up --build
```

This will start the application along with PostgreSQL and pgAdmin.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

The API documentation is available at http://localhost:3000/api when the application is running.

## Environment Variables

The following environment variables should be set in the .env file:

```
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
OPENWEATHER_API_KEY=your_openweather_api_key
```

Ensure the OPENWEATHER_API_KEY is correctly configured with access to the One Call API.

## License

MIT
