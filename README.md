# AICRBot - AI Code Review Bot

AICRBot is an AI-powered code review tool that helps developers get instant feedback on their code. The project consists of a React frontend and a Node.js backend.

## Project Structure

- `Frontend/`: React application built with Vite
- `Backend/`: Node.js server with Express.js

## Features

- Code editor with syntax highlighting
- AI-powered code review suggestions
- Real-time feedback on code quality
- Responsive UI with dark theme

## Recent Changes

- Decreased the breadth of the code review heading container in the AI suggestions sidebar to improve layout.

## Setup

### Frontend

1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

### Backend

1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

## Usage

1. Open the frontend in your browser (usually at `http://localhost:5173` for Vite).
2. Write or paste your code in the editor.
3. Click the "Review" button to get AI feedback.
4. View suggestions in the sidebar.

## Technologies Used

- **Frontend**: React, Vite, Monaco Editor
- **Backend**: Node.js, Express.js
- **AI Integration**: Custom AI service for code analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Git Ignore

The `.gitignore` file excludes:
- Dependencies (`node_modules/`)
- Build outputs (`dist/`, `build/`)
- Environment variables (`.env*`)
- Logs and temporary files
- Editor-specific files (`.vscode/`, `.idea`)
- OS-generated files

Ensure to keep `.gitignore` updated with any new files or directories that should not be tracked by Git.
