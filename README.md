# Getting Started

First you will need to install Docker (this was all tested using Docker Desktop for Windows).  
Then, simply run `docker-compose up --build` at the root of the project.

# Technical info

We use an express gateway in front of all other services to handle authentication.
Since this is a prototype, creating users is handled directly using the admin endpoints provided by express gateway.
In reality, another service would have to be created so we have more control.

# Usage

## Authentication

Authentication is handled by an Express Gateway.  

To create a new user:  
Send a POST request to http://localhost:9876/users :  
`POST /users`
```
{
  "username": "steve@example.com",
  "firstname": "Steve", 
  "lastname": "Brown", 
  "birthdate": "1984-11-01" 
}
```

Then, create credentials for your user :  
`POST /credentials`  
```
{
  "consumerId": "steve@example.com",
  "type": "basic-auth"
}
```

The server will generate a password, which will be given to you in the response.  
Copy that password somewhere.  
You are now ready to make your first API requests.

## API

To test things out, you can try sending a request to the catalog endpoint:  
```
GET http://localhost:8080/catalog
'Authorization': 'Basic dGVzdDFAdGVzdC5jb206NWM0NzcxMzgtNzlkNS00ZGVhLTk2MzktODhhNWFmN2I4YTAx'

```

The authorization key is made up of the username and password after base64 encoding. You can get it by simply running `btoa("username:password")` in a javascript console.  
Example:
```
> btoa("test1@test.com:5c477138-79d5-4dea-9639-88a5af7b8a01")
< "dGVzdDFAdGVzdC5jb206NWM0NzcxMzgtNzlkNS00ZGVhLTk2MzktODhhNWFmN2I4YTAx"
```
