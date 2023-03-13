# Restaurant Reservation

- Implemented JWT for authentication and authorization

- Protecting routes/endpoints with JWT (JSON Web Tokens)

- Complete CRUD functionality

- Setup MongoDB database in the cloud (Atlas)

- Express & Mongoose Middleware (Auth, Error Handling, etc)

- Focus on API security best practices.

- Extensive API testing with Postman

- API Documentation

Technology: Express, MongoDB, NodeJS

### Onion Architecture

- src/
  - domain/
    - models/ // Domain models
      - user.js
    - services/ // Domain services
      - user.js
  - application/
    - controllers/ // Application controllers
      - userController.js
    - middlewares/ // Application middlewares
      - authMiddleware.js
  - infrastructure/
    - repositories/ // Infrastructure repositories
      - userRepository.js
    - dataSources/ // Infrastructure data sources
      - database.js
  - interfaces/
    - api/ // API interfaces
      - routes/ // API routes
        - user.js
        - auth.js
    - validators/ // Input validators
      - userValidator.js
- test/ // Test files
- node_modules/ // Dependencies
- package.json // Project dependencies and configuration
