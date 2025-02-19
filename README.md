# Authy

A dummy authentication app I wrote to practice user registration and login functionality (from scratch), includes an Express API server.

> [!NOTE]
> This is for Educational purposes only.

## Tech Stack & Packages

- React + TypeScript
- Express.js Backend
- Vite for Build Tool and Development Server
- TanStack Query for API calls
- Tailwind CSS for Styling
- Zustand for State Management
- LowDB for mock DB implementation
- bcrypt for Password Hashing
- jsonwebtoken for ... well it's self explanatory

### Prerequisites

- Node.js

### Usage

```sh
pnpm install && pnpm run start
```

### Setup Environment Variables

1. Create a `.env` file in the root directory of your project.
2. Add the following line to the `.env` file:
   ```sh
   JWT_SECRET_KEY=your_secret_key_here
   ```
3. Replace `your_secret_key_here` with a secure, randomly generated key. You can use a tool like `openssl` to generate this key:
   ```sh
   openssl rand -base64 32
   ```
### Authy Explained

- User registers with a username and password.
- Backend checks for existing username.
- Password is hashed and stored if username is unique.
- JWT token is generated and returned upon successful registration.
- User logs in with username and password.
- Backend verifies credentials and checks hashed password.
- JWT token is generated and user session is managed.