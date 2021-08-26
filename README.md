# Air Quality API

## Preparing
Create an iqair account : https://www.iqair.com/fr/

Generate an API Key : https://www.iqair.com/fr/dashboard/api

Based on **env.exemple** content, create **dev.env**, **test.env** and **prod.env**.

```
# Default environment variables
DB_URI=mongodb://db_mongo/air-quality
IQAIR_API_URL=https://api.airvisual.com/v2/nearest_city
IQAIR_API_KEY=<Your IQAIR API KEY HERE>
```

By default, DB_URI point to docker mongo container :
```
mongodb://db_mongo/<Database Name>
```

## Running
```bash
# Run docker container
$ npm run docker
```

## Endpoints
### API: /api
* **Get Air Quality near coordinates (LAT, LON) : /api/pollution (POST)** body: {lat: number, lon: number} (return pollution)
* **Get Air Quality stored in database (via CRON Job) : /api/pollution (GET)** (return pollution[])
* **Get max pollution stored in database : /api/pollution/max (POST)** body: (return pollution)

### Docs : /api/docs

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```