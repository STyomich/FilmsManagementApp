# Film Management Application

This repository contains a Film Management application with a C# backend and a React frontend.

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (version 8.0 or later)
- [Node.js](https://nodejs.org/) (version 14.0 or later)
- [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)

## Getting Started

### Backend (C#)

1. Navigate to the backend directory:
    cd API

2. Restore the dependencies:
    dotnet restore

3. Build the project:
    dotnet build

4. Run the application:
    dotnet run

The backend should now be running on `http://localhost:5000`.

### Frontend (React)

1. Navigate to the frontend directory:
    cd client-app

2. Install the dependencies:
    npm install

3. Start the development server:
    npm run dev

The frontend should now be running on `http://localhost:3000`.

### Database (MS SQL)

1. Navigate API folder which store appsettings.json.

2. Edit DefaultConnection property for your purposes.

3. Backup of my database included to this repository as .bak file.

