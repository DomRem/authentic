This package is a simple REST API written in TypeScript. Its function is to authenticate the users.

# User object
The user object has the following structure:
```typescript
interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}
```

# Endpoints
Each endpoint has payload validation.
- [x] endpoint for get users
- [x] endpoint for create user
- [x] endpoint for update user
- [x] endpoint for delete user

# Automated tests
[TODO](../TODOs.md#server)

# DB
[TODO](../TODOs.md#server)
For the time being, the data is stored in a file. 

# Modules
## auth

## db

## users

# Scripts

- `start:dev` -
- `start` - 