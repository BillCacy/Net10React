# Forms

Working with forms, submission, validation

# Calling an API

User data generator : [Random User Generator](https://randomuser.me/)

`results` array from response will have a random user with properties similar to:

```
{
    "gender": "male",
    "name": {
        "title": "Mr",
        "first": "Baltasar",
        "last": "Freitas"
    },
    "location": {
        "street": {
            "number": 4181,
            "name": "Rua Quatro"
        },
        "city": "Jacareí",
        "state": "Goiás",
        "country": "Brazil",
        "postcode": 70816,
        "coordinates": {
            "latitude": "-79.9693",
            "longitude": "-111.6904"
        },
        "timezone": {
            "offset": "+1:00",
            "description": "Brussels, Copenhagen, Madrid, Paris"
        }
    },
    "email": "baltasar.freitas@example.com",
    "login": {
        "uuid": "2776875a-9f44-4086-b0c9-f42141d3dc7e",
        "username": "smallmeercat956",
        "password": "223344",
        "salt": "M7qqdFzE",
        "md5": "75aa1a18022f16b2fcf2dcaafe5dcb64",
        "sha1": "057495dfd7890727d06158a8cf680f58a087b974",
        "sha256": "d4d2857d8cd654e028f0489f6f2b85c0faaf2b9ed47041099980780dacb54929"
    },
    "dob": {
        "date": "1960-04-09T20:37:35.873Z",
        "age": 66
    },
    "registered": {
        "date": "2005-06-21T14:40:35.053Z",
        "age": 21
    },
    "phone": "(21) 8287-4873",
    "cell": "(20) 5080-3490",
    "id": {
        "name": "CPF",
        "value": "942.971.793-25"
    },
    "picture": {
        "large": "https://randomuser.me/api/portraits/men/6.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/6.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/6.jpg"
    },
    "nat": "BR"
}
```

## API Calls with Axios

A promise-based HTTP client used in React to make network requests to APIs. It allows React applications to send and receive data from a backend server, database, or external service.
