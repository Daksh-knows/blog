# BlogHub - Full-Stack Blogging Platform

A modern blogging platform where users can write, publish, and manage their blog posts. Built with React, TypeScript, Node.js, Express, and MongoDB.

## Overview

BlogHub is a feature-rich blogging application that allows users to create and share their thoughts through blog posts. The platform includes user authentication, role-based access control, and a clean, intuitive interface for managing content.

## Features

### For Users

- Create an account and log in securely
- Write and publish blog posts with rich formatting
- Save posts as drafts before publishing
- Edit and delete your own posts
- Add tags to organize content
- Search and filter through published posts
- View post statistics like read time

### For Admins

- Dashboard with platform statistics
- View all posts (including drafts from other users)
- Manage users and content
- Delete any post when necessary
- Monitor platform activity

## Tech Stack

**Frontend:**

- React with TypeScript
- React Router for navigation
- Axios for API communication
- Tailwind CSS for styling
- React Toastify for notifications

**Backend:**

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Express Validator for input validation

## Getting Started

### Prerequisites

Make sure you have these installed on your machine:

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Daksh-knows/blog.git
   cd blog
   ```

2. **Set up the Backend**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bloghub
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

   Start the backend server:

   ```bash
   npm run dev
   ```

3. **Set up the Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the frontend directory:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

   Start the frontend:

   ```bash
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/v1

## Project Structure

```
blog/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication & validation
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
│
└── frontend/
    ├── public/          # Static files
    └── src/
        ├── components/  # Reusable components
        ├── context/     # React context
        ├── pages/       # Page components
        ├── services/    # API services
        ├── types/       # TypeScript types
        └── App.tsx      # Main component
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user info

### Posts

- `GET /api/v1/posts` - Get all published posts
- `GET /api/v1/posts/:id` - Get single post
- `GET /api/v1/posts/user/me` - Get current user's posts
- `POST /api/v1/posts` - Create new post (auth required)
- `PUT /api/v1/posts/:id` - Update post (auth required)
- `DELETE /api/v1/posts/:id` - Delete post (auth required)

### Admin

- `GET /api/v1/posts/admin/all` - Get all posts (admin only)
- `GET /api/v1/posts/admin/users` - Get all users (admin only)
- `GET /api/v1/posts/admin/stats` - Get statistics (admin only)

## Usage

### Creating Your First Post

1. Register for an account or log in
2. Click "Create Post" in the navigation
3. Fill in the title, content, and optional excerpt
4. Add tags separated by commas
5. Choose between "Draft" or "Published"
6. Click "Create Post"

### Managing Your Posts

Visit the "My Posts" dashboard to:

- View all your posts
- Edit existing posts
- Delete posts you no longer need
- See post status (draft or published)

### Admin Access

To create an admin user, connect to your MongoDB database and update a user's role:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

## Environment Variables

### Backend

| Variable   | Description               | Example                           |
| ---------- | ------------------------- | --------------------------------- |
| PORT       | Server port               | 5000                              |
| MONGO_URI  | MongoDB connection string | mongodb://localhost:27017/bloghub |
| JWT_SECRET | Secret key for JWT        | your_secret_key                   |
| JWT_EXPIRE | Token expiration time     | 7d                                |
| NODE_ENV   | Environment mode          | development                       |
| CLIENT_URL | Frontend URL              | http://localhost:5173             |

### Frontend

| Variable          | Description     | Example                      |
| ----------------- | --------------- | ---------------------------- |
| REACT_APP_API_URL | Backend API URL | http://localhost:5000/api/v1 |

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Protected routes require valid authentication
- Role-based access control for admin features
- Input validation on all forms
- CORS protection configured
- Helmet.js for security headers

## Troubleshooting

**Can't connect to MongoDB?**

- Make sure MongoDB is running locally or your Atlas connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas

**API requests failing?**

- Verify the backend server is running
- Check CORS configuration
- Ensure environment variables are set correctly

**TypeScript errors?**

- Run `npm install` to ensure all dependencies are installed
- Check that `@types/node` is installed

## Future Enhancements

Some ideas for future improvements:

- Comment system for posts
- Like and bookmark features
- User profiles with avatars
- Image upload for posts
- Rich text editor integration
- Email notifications
- Social media sharing
- Categories in addition to tags
- Search with filters
- Pagination improvements

## Known Issues

- Image uploads not yet supported (coming soon)
- Rich text formatting limited to plain text
- No email verification on signup

## License

This project is open source and available under the MIT License.

## Acknowledgments

Thanks to everyone who tested the application and provided feedback. Special thanks to the open source community for the amazing tools and libraries that made this project possible.

## Contact

If you have any questions or suggestions, feel free to reach out or open an issue on GitHub.

---
