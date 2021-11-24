# Weather App
Node JS and Typescript application that provides a REST API to obtain the weather of cities by its name or by its geographic coordinates, obtaining information from external providers.

## Supported providers
- OpenWeatherMap: https://openweathermap.org/

## Run App

### Run App with Docker

To run weather app in a docker container we must follow the following steps:

- Clone proyect 

- Set project directory as work directory

- Build Docker image: ```docker build -t weather .``` 

- Build Docker image: ```docker build -t weather .``` 

- Run Docker image and foward port: ```docker run -p 3800:3800 weather```

- All done! Weather App server is listening on port 3800 (Or whatever port you have forwarded to 3800 inside the docker container)

### Run App locally

To run weather app locally with NodeJs, first you need to have the **16.13.0 LTS version of Node** and a **version of npm greater or equal to 8.1.0**:

- Visit https://nodejs.org/es/ and check if you have installed the **proper versions of npm and Node**

- Clone proyect 

- Set project directory as work directory

- npm run build

- npm start

- All done! Weather App server is listening on port 3800!

# API

This server provides a read-only REST API that gives weather data of cities by its name or by its geographic coordinate.

## City name API

##### GET /api/weather/city/{city_name}?provider={provider}&accessToken={access_token}
Gets details about the weather of the indicated city requesting to the indicated provider, currently the only provider is OpenWeather (and the default provider) so the provider parameter is optional, but it is required to indicate an access token to perform the request. **To to obtain an access token please register at https://openweathermap.org/**

###### Example request
```shell
curl --location --request GET 'http://0.0.0.0:3800/api/weather/city/rio cuarto?provider=OpenWeather&accessToken={access_token}'
```

###### Example response
```json
{
    "city": "Río Cuarto",
    "coordinates": {
        "lat": -33.1307,
        "lon": -64.3499
    },
    "temperature": 25.49,
    "feelsLike": 25.17,
    "payload": {
        "visibility": 10000,
        "pressure": 1009,
        "humidity": 41,
        "clouds": 0,
        "windSpeed": 9.77
    }
}
```

##### GET http://0.0.0.0:3800/api/weather/city/{city_name}/greaterThan/{temperature}?accessToken={access_token}
Checks if the temperature of a city is higher than a certain temperature

###### Example request
```shell
curl --location --request GET 'http://0.0.0.0:3800/api/weather/city/rio cuarto/greaterThan/15?provider=OpenWeather&accessToken={access_token}'
```

## Geographical Coordinates API

##### GET /api/weather/lat/{lat}/lon/{lat}?provider={provider}&accessToken={access_token}
Gets details about the weather of the indicated city requesting to the indicated provider, currently the only provider is OpenWeather (and the default provider) so the provider parameter is optional, but it is required to indicate an access token to perform the request. **To to obtain an access token please register at https://openweathermap.org/**

###### Example request
```shell
curl http://0.0.0.0:3800/api/weather/lat/-31.4135/lon/-64.1811?accessToken={access_token}
```

###### Example response
```json
{
    "city": "America/Argentina/Cordoba",
    "coordinates": {
        "lat": -31.4135,
        "lon": -64.1811
    },
    "temperature": 25.56,
    "feelsLike": 25.27,
    "payload": {
        "visibility": 9000,
        "pressure": 1013,
        "humidity": 42,
        "uvi": 2.94,
        "clouds": 1,
        "windSpeed": 3.58
    }
}
```

##### GET http://0.0.0.0:3800/api/weather/lat/{lat}/lon/{lon}/greaterThan/{temperature}?accessToken={access_token}
Checks if the temperature of a city is higher than a certain temperature

###### Example request
```shell
curl http://0.0.0.0:3800/api/weather/lat/-31.4135/lon/-64.1811/greaterThan/15?accessToken={access_token}
```

###### Example response
```json
true
```
```json
false
```

# Add code

## In Linus Torvalds we trust, all others use lint

A pre-commit git hook was established so when trying to commit changes the lint, test and build scripts will be run to check that everything runs correctly.