# Getting Started

## Running the application

First you will need to install Docker (this was all tested using Docker Desktop for Windows).  
Then, simply run `docker-compose up --build` at the root of the project.

## Troubleshooting

Sometimes you will get an error saying that a service failed to connect to the database.  
Running the command again usually fixes it.

## Testing

Navigate to the `/test` directory and run `npm i && npm run build && npm start`.

# Technical info

We use an express gateway in front of all other services to handle authentication.
Since this is a prototype, creating users is handled directly using the admin endpoints provided by express gateway.
In reality, another service would have to be created so we have more control.

# Documentation

## Service: Catalog

`GET /catalog` : lists all available movies.

`GET /catalog/:id` : get a movie by ID.

`GET /catalog/:title` : search movies by title.

## Service: Renting (Authenticated)

`GET /renting`: lists the rentals of the authenticated user.  

`GET /renting/rent`: rent a movie by ID for the authenticated user.  
Body: {movieId: number}

`POST /renting/price/:movieId`: set the price for a movie.  
Body: {price: number}

`GET /renting/price/:movieId`: get the price for a movie.  

## Service: Streaming (Authenticated)

`GET /streaming/:movieId`: attempt a stream a movie (for this prototype, simply returns whether or not the operation is allowed).  
This will only succeed if the authenticated user has rented that movie in the past 30 days.

# Usage

## Creating a user

Users are managed by Express Gateway.  

To create a new user:  
Send a POST request to http://localhost:9876/users :  
```
POST /users
Body: {
  "username": "steve@example.com",
  "firstname": "Steve", 
  "lastname": "Brown", 
  "birthdate": "1984-11-01" 
}
```

Then, create credentials for your user :  
```
POST /credentials
Body: {
  "consumerId": "steve@example.com",
  "type": "basic-auth"
}
```

The server will generate a password, which will be given to you in the response.  
Copy that password somewhere.  
You are now ready to make your first API requests.

## Authenticating 

To test things out, you can try sending a request to the catalog endpoint:  
```
GET http://localhost:8080/catalog
Headers: {
'Authorization': 'Basic dGVzdDFAdGVzdC5jb206NWM0NzcxMzgtNzlkNS00ZGVhLTk2MzktODhhNWFmN2I4YTAx'
}
```

The authorization key is made up of the username and password encoded in base64.  
You can get it by simply running `btoa("username:password")` in a javascript console.  
Example:
```
> btoa("test1@test.com:5c477138-79d5-4dea-9639-88a5af7b8a01")
< "dGVzdDFAdGVzdC5jb206NWM0NzcxMzgtNzlkNS00ZGVhLTk2MzktODhhNWFmN2I4YTAx"
```
