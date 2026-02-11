# Copilot Instructions for Backend Project

## Overview
This project is a backend application structured around a Node.js and Express.js framework. It provides RESTful APIs for managing products and user authentication. The codebase is modular, with clear separation of concerns across controllers, models, routes, and middleware.

### Key Components
- **Controllers**: Handle the business logic for different features.
  - Example: `auth.controller.js` manages user authentication.
  - Example: `product.controller.js` manages product-related operations.
- **Models**: Define the data schema and interact with the database.
  - Example: `user.model.js` defines the user schema.
  - Example: `product.model.js` defines the product schema.
- **Routes**: Define the API endpoints and map them to controllers.
  - Example: `authRouter.js` handles authentication routes.
  - Example: `productsRouter.js` handles product-related routes.
- **Middleware**: Contains reusable logic for request processing.
  - Example: `authMiddleware.js` verifies user authentication.
- **Database Configuration**: Located in `config/mongodb.js`, it sets up the MongoDB connection.

### Data Flow
1. **Request**: A client sends an HTTP request to a specific route.
2. **Routing**: The request is routed to the appropriate controller via the route files.
3. **Controller Logic**: The controller processes the request, interacts with the database through models, and returns a response.
4. **Response**: The processed data is sent back to the client.

## Developer Workflows
### Running the Application
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```

### Testing API Endpoints
Use the provided `curl` commands in the [README.md](README.md) to test the API endpoints. Examples include:
- Fetching products:
  ```sh
  curl http://localhost:50000/products
  ```
- Adding a product:
  ```sh
  curl -X POST http://localhost:50000/products -H "Content-Type: application/json" -d '{
    "name": "Par de medias 2",
    "price": 50,
    "stock": 0,
    "category": "Ropa",
    "description": "Medias de algodón unisex."
  }'
  ```

### Debugging
- Use `console.log` statements for quick debugging.
- Check the MongoDB connection in `config/mongodb.js` if database operations fail.

## Project-Specific Conventions
- **Error Handling**: Use `try-catch` blocks in controllers to handle errors gracefully.
- **Response Format**: Ensure all responses follow a consistent structure:
  ```json
  {
    "success": true,
    "data": {},
    "message": ""
  }
  ```
- **Environment Variables**: Store sensitive information (e.g., database URI) in a `.env` file.

## Integration Points
- **MongoDB**: The database is configured in `config/mongodb.js`. Ensure the MongoDB URI is correctly set in the `.env` file.
- **Authentication**: The `authMiddleware.js` ensures secure access to protected routes.

## Examples
- Adding a new route:
  1. Create a new route file in `routes/`.
  2. Define the route logic in the corresponding controller.
  3. Import and use the route in `src/index.js`.

- Adding a new model:
  1. Define the schema in `models/`.
  2. Use the model in the relevant controller.

---
This guide is a living document. Update it as the project evolves.