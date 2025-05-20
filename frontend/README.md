Authentication Application
This is a full-stack authentication module built with Next.js (frontend) and NestJS (backend), using MongoDB as the database. The app includes user signup, signin, and a protected application page, with a professional UI and secure backend.
Features

Frontend:
Sign-up and sign-in forms with real-time validation using Zod.
Protected application page with middleware.
Responsive, professional UI with Tailwind CSS.
Reusable components (InputField, Button) for consistency.
Toast notifications for user feedback.


Backend:
RESTful API with NestJS and MongoDB (Mongoose).
JWT-based authentication with bcrypt password hashing.
Protected /user/profile endpoint.
Logging with Winston (logs stored in backend/logs/).
API documentation with Swagger (/api).
Security features: Helmet, rate limiting, input validation.


Code Quality:
TypeScript for type safety.
Modular structure with clear separation of concerns.
Error handling and logging.



Project Structure
auth-app/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/signin/
│   │   │   ├── auth/signup/
│   │   │   ├── (protected)/application/
│   │   │   ├── layout.tsx
│   │   │   ├── middleware.ts
│   │   ├── components/
│   │   │   ├── InputField.tsx
│   │   │   ├── Button.tsx
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── schemas.ts
│   │   ├── styles/
│   │   │   ├── globals.css
│   ├── tailwind.config.ts
│   ├── .env.example
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   ├── schemas/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── jwt.strategy.ts
│   │   ├── user/
│   │   │   ├── user.module.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.controller.ts
│   │   ├── config/
│   │   │   ├── winston.config.ts
│   │   ├── app.module.ts
│   │   ├── main.ts
│   ├── logs/
│   ├── .env.example
├── README.md

Prerequisites

Node.js (v18 or higher)
MongoDB (local or MongoDB Atlas)
npm or yarn

Setup Instructions

Clone the repository:
git clone <repository-url>
cd auth-app


Frontend Setup:
cd frontend
npm install
cp .env.example .env.local

Update .env.local:
NEXT_PUBLIC_API_URL=http://localhost:3001


Backend Setup:
cd backend
npm install
cp .env.example .env

Update .env:
MONGODB_URI=mongodb://localhost:27017/authdb
JWT_SECRET=your_jwt_secret


Run the Application:

Backend:cd backend
npm run start:dev

API runs on http://localhost:3001. Swagger docs at http://localhost:3001/api.
Frontend:cd frontend
npm run dev

App runs on http://localhost:3000.



API Endpoints

POST /auth/signup: Register a new user.
Body: { email: string, name: string, password: string }


POST /auth/signin: Sign in a user, returns JWT.
Body: { email: string, password: string }


GET /user/profile: Protected endpoint to fetch user profile (requires JWT in Authorization: Bearer <token>).

Security

Passwords hashed with bcrypt.
JWT for session management.
Input validation with class-validator and Zod.
Helmet for secure HTTP headers.
Winston logging for requests and errors.

Future Improvements

Add unit and integration tests with Jest.
Implement CI/CD with GitHub Actions.
Add refresh tokens for JWT.
Enhance rate limiting with Redis.

Submission
The code is hosted in a public GitHub repository: <insert-repo-link>.