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

## API Calls

Project uses fetch() which is supported by all major browsers.

When it makes sense the following libraries wrap the functionality

`ky` (about 4 KB) is a small wrapper around fetch that brings back axios's conveniences: error statuses, JSON parsing, timeouts and retries. It's a good middle ground if you get tired of writing that code yourself.

`axios` is still a reasonable choice if you need request/response interceptors (for example, adding an auth token to every call) or upload progress events.

`TanStack Query` is the bigger step up once an app loads data from several endpoints. It doesn't replace fetch; it sits on top of it. It handles loading and error states, caching, retries and refetching, which is the isLoading/error code AddRandomContact now does by hand.

# Project Structure

```
src/
  api/          randomUser.js       - fetch call + maps API user to our contact shape
  assets/       static images imported by components
  components/
    contacts/   ContactIndex (page), AddContact (form), ContactList, Contact, AddRandomContact
    layout/     Header, Footer
  data/         initialContacts.js  - seed data for first load
  hooks/        useContacts.js      - state, validation, localStorage persistence
  state/        contactsReducer.js  - pure reducer; validateContact.js - validation rules
  test/         setup.js            - Vitest + Testing Library setup
  App.jsx       page layout
  main.jsx      mounts <App />
```

Tests live next to the code they cover (`*.test.js` / `*.test.jsx`).

## Scripts

| Command              | What it does                  |
| -------------------- | ----------------------------- |
| `npm run dev`        | Start the dev server          |
| `npm test`           | Run the tests once            |
| `npm run test:watch` | Re-run tests on file changes  |
| `npm run lint`       | Lint with ESLint              |
| `npm run build`      | Production build into `dist/` |

## Conventions

- Props that receive callbacks are named `onX`; the functions that handle them are `handleX`.
- The reducer stays pure: ids, validation and storage happen in `useContacts`.
- React Compiler is enabled in `vite.config.js`, so there is no manual `useMemo`/`useCallback`.
