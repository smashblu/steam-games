# Tests to perform

## index.js

- Operations
    - GET on /games
        - [x] Test successful request
    - POST on /games
        - [x] Test successful request
        - [x] Test already existing entry
    - GET on /games/gameId
        - [x] Test successful request
        - [x] Test if entry does not exist
        - [ ] Test request not a number
    - GET on /games/publisherId
        - [ ] Test successful request
        - [ ] Test if entry does not exist
        - [ ] Test request not a number
    - PATCH on /games/gameId
        - [ ] Test successful request
        - [ ] Test attempt to change ID
        - [ ] Test if entry does not exist
    - DELETE on /games/gameId
        - [ ] Test successful request
        - [ ] Test if entry does not exist
        - [ ] Test request is not a number
- Endpoint
    - POST on /games
        - [ ] Full test on endpoint without mock functions
    - DELETE on /games/gameId
        - [ ] Full test on endpoint without mock functions

## service.js

- Functions
    - validateNum
        - [x] Test true/false validation
    - existsHelper
        - [x] Test true/false for object
        - [x] Test true/false for nested object
    - findProperty
        - [x] Test if property exists
    - findPropertyIndex
        - [x] Test if property exists
    - updateProps
        - [x] Test successful update of property
        - [x] Test failed update of property
    - matchProp
        - [x] Test true/false for property
        - [x] Test true/false for value
    - makeList
        - [x] Test list creation
        - [x] Test creating empty list

## database.js

- No tests as functions utilize native JS functions