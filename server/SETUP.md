# Server Setup Guide

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```bash
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
DATABASE_URL=mongodb://localhost:27017/punarnavah
CLIENT_URL=http://localhost:5173
```

## Steps to Run

1. Create the `.env` file with the above variables
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

## Important Notes

- Make sure MongoDB is running on your system
- The JWT_SECRET should be a strong, random string
- The server will run on port 5000 by default
- The client should be configured to connect to http://localhost:5000
