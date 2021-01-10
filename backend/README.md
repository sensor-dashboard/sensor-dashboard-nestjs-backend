# Sensor dashboard backend

## Description

Simple NestJS backend for a dashboard displaying graphs of environmental sensor data.

How this works? You create a sensor entry in the database via the API with the admin token, which creates the sensor authentication token (`accessToken` field of the sensor entry). With the sensor authentication token you program your sensor board to make api calls to import measurements. One board can have multiple sensors, so you can import multiple measurements at a time.

See also [frontend](https://github.com/xtrinch/sensor-dashboard-react-frontend) and [sensor board code](https://github.com/xtrinch/sensor-dashboard-ESP32-BME680-reader), or [see it live](http://iotfreezer.com) with some sensor data from my living room.

## Installation

```bash
$ yarn install
$ cp .env.local.example .env.local
$ cp .env.test.example .env.test
```
Fill out database credentials in .env files.

For detailed API documentation (swagger docs) see `http://localhost:3000/swagger`.

## Endpoints

 Endpoint              | Method | Auth?             | Query params                                 | Description
 --------------------- | ------ | ----------------- | -------------------------------------------- | ------------------------------------------------
 `/sensors`            | GET    | No                |                                              | List all sensor boards
 `/sensors`            | POST   | Yes - Admin auth  |                                              | Create a sensor entry
 `/measurements`       | GET    | No                | createdAtRange, measurementTypes, sensorIds | List all measurements
 `/measurements`       | POST   | Yes - Sensor auth |                                              | Post one measurement for a sensor board
 `/measurements/multi` | POST   | Yes - Sensor auth |                                              | Post multiple measurements for a sensor board

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Migrations

Generate migrations:
```bash
$ yarn run typeorm migration:generate -n SampleMigrationName
```

Run migrations:
```bash
$ yarn run typeorm migration:run
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Production setup
 
```bash
# spin up postgres, node and test container
$ docker-compose up -d

# backup database in production
$ docker exec -t postgres pg_dump --no-owner -U postgres sensor-dashboard > ../sensor-dashboard-database-backups/backup
```

## Restore from dump on windows

Data only restore, migration inserts will fail but the rest should succeed.

```bash
$ pg_restore --host "localhost" --port "5433" --username "postgres" --dbname "sensor-dashboard" --verbose --schema "public" "C:\Users\xtrinch\Downloads\backup-production-21-12-2020.dump"
```