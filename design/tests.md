# Tests to perform

## index.js

- Operations
    - GET on /games
        - Test successful request
    - POST on /games
        - Test successful request
        - Test already existing entry
    - GET on /games/gameId
        - Test successful request
        - Test if entry does not exist
        - Test request not a number
    - GET on /games/publisherId
        - Test successful request
        - Test if entry does not exist
        - Test request not a number
    - PATCH on /games/gameId
        - Test successful request
        - Test attempt to change ID
        - Test if entry does not exist
    - DELETE on /games/gameId
        - Test successful request
        - Test if entry does not exist
        - Test request is not a number
- Endpoint
    - POST on /games
        - Full test on endpoint without mock functions
    - DELETE on /games/gameId
        - Full test on endpoint without mock functions

## service.js

- Functions
    - validateNum
        - Test true/false validation
    - existsHelper
        - Test true/false for object
        - Test true/false for nested object
    - findProperty
        - Test if property exists
    - findPropertyIndex
        - Test if property exists
    - updateProps
        - Test successful update of property
        - Test failed update of property
    - matchProp
        - Test true/false for property
        - Test true/false for value
    - makeList
        - Test list creation
        - Test creating empty list

## database.js

- No tests as functions utilize native JS functions