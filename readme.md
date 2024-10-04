
# Note-Taker Website

This is a **Note-Taker Website** that allows users to create, save, and manage personal notes. The project consists of two main components: the **Frontend** (Angular) and the **Backend** (Node.js with Express). The frontend integrates Firebase for Google login authentication, and the backend serves the API for data persistence.

## Table of Contents
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Firebase Setup for Google Login](#firebase-setup-for-google-login)
- [Running the Project](#running-the-project)
- [Setting Authentication Sites for Google](#setting-authentication-sites-for-google)

---

## Frontend Setup

The frontend is built using **Angular**, and it communicates with the backend API and uses **Firebase** for Google authentication.

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.
- **Angular CLI**: Install Angular CLI globally using the command:
  ```bash
  npm install -g @angular/cli
  ```

### Steps to Set Up Frontend

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Krishnadas-N/Note-taker-Website.git
  cd new_foldername
  cd Frontend
   ```

2. **Install Dependencies**
   Run the following command to install the required packages:
   ```bash
   npm install
   ```

3. **Environment Configuration**
   The frontend requires configuration for both the backend API and Firebase. Modify the environment configuration in `src/environments/environment.ts`:

   ```typescript
   export const environment = {
     production: false,
     backendUrl: "http://127.0.0.1:3000", // Backend API URL
     firebaseConfig: {
       apiKey: "<your-firebase-api-key>",
       authDomain: "<your-firebase-auth-domain>",
       projectId: "<your-firebase-project-id>",
       storageBucket: "<your-firebase-storage-bucket>",
       messagingSenderId: "<your-firebase-messaging-sender-id>",
       appId: "<your-firebase-app-id>",
       measurementId: "<your-firebase-measurement-id>"
     }
   };
   ```

4. **Firebase Setup**
   Ensure that Firebase is correctly configured for Google login (see the **Firebase Setup for Google Login** section below).

5. **Run the Frontend**
   After setting up, you can start the Angular development server with:
   ```bash
   ng serve
   ```
   The frontend will be accessible at `http://localhost:4200`.

---

# Note-Taker Website Backend

This is the **Backend** of the Note-Taker Website, built using **Node.js**, **Express**, and **TypeScript**. It provides REST APIs for managing user notes, handles authentication using JWT, and integrates with Firebase for admin authentication.

## Table of Contents
- [Backend Setup](#backend-setup)
- [Environment Configuration (.env)](#environment-configuration-env)
- [Firebase Admin Setup](#firebase-admin-setup)
- [Scripts](#scripts)
- [Running the Project](#running-the-project)
- [License](#license)

---

## Backend Setup

Follow these steps to set up and run the backend for the Note-Taker Website.

### Prerequisites

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **MongoDB** (Ensure MongoDB is installed and running, if applicable)
- **Firebase** account (for admin authentication)

### Steps to Set Up the Backend

1. **Clone the Repository**
   ```bash
  
   cd Backend
   ```

2. **Install Dependencies**
   Install all required dependencies by running:
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root of the project with the following variables:

   ```bash
   JWT_TOKEN_SECRET=<your-jwt-secret>
   JWT_REFRESH_SECRET=<your-jwt-refresh-secret>

   DB_HOST=<your-database-host>
   DB_PORT=<your-database-port>
   DB_USER=<your-database-user>
   DB_PASSWORD=<your-database-password>
   DB_NAME=<your-database-name>

   FIREBASE_SERVICE_ACCOUNT='{
     "type": "service_account",
     "project_id": "<your-firebase-project-id>",
     "private_key_id": "<your-firebase-private-key-id>",
     "private_key": "-----BEGIN PRIVATE KEY-----\\n<your-private-key>\\n-----END PRIVATE KEY-----\\n",
     "client_email": "<your-firebase-client-email>",
     "client_id": "<your-firebase-client-id>",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<your-client-email>",
     "universe_domain": "googleapis.com"
   }'
   ```

   **Note:** Replace `<your-...>` placeholders with actual values from your Firebase project and database configuration.

4. **Firebase Admin Setup**
   Follow the steps below to create the Firebase Admin SDK for your backend authentication:

   ### Firebase Admin Setup
   1. Go to the [Firebase Console](https://console.firebase.google.com/).
   2. Click on your project.
   3. In the left-hand menu, go to **Project Settings**.
   4. Scroll down to the **Service Accounts** tab.
   5. Click on **Generate New Private Key**, and it will download a `.json` file.
   6. Open the `.json` file and copy its contents to set the `FIREBASE_SERVICE_ACCOUNT` in your `.env` file (as shown above).

   This setup enables Firebase admin SDK for server-side authentication and authorization.

---

## Scripts

The following are the available **npm scripts** defined in the `package.json`:

- **`build`**: Transpile the TypeScript code to JavaScript.
  ```bash
  npm run build
  ```

- **`start`**: Start the server using `nodemon` for live reloading.
  ```bash
  npm run start
  ```

- **`dev`**: Run the build and the server in parallel for development.
  ```bash
  npm run dev
  ```

---

## Running the Project

After configuring the environment and installing dependencies, follow these steps to run the project:

1. **Build the Project**
   Compile the TypeScript code into JavaScript:
   ```bash
   npm run build
   ```

2. **Start the Server**
   Run the server using `nodemon`:
   ```bash
   npm run start
   ```

3. **Run in Development Mode**
   To run the server and watch for changes, use the following command:
   ```bash
   npm run dev
   ```

The backend server should now be running on `http://127.0.0.1:3000`.

## Firebase Setup for Google Login

To integrate Google login via Firebase, follow these steps:

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Click on **Add Project** and follow the instructions.

2. **Enable Google Authentication**
   - In the Firebase Console, navigate to **Authentication**.
   - Under the **Sign-in method** tab, enable **Google**.

3. **Get Firebase Configuration**
   - Navigate to **Project Settings** and under the **General** tab, find your Firebase SDK configuration.
   - Copy the following values: `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, `measurementId`.
   - Paste these values in your frontend’s `environment.ts` file.

4. **Install Firebase and AngularFire**
   Install Firebase and AngularFire in your Angular project:
   ```bash
   npm install firebase @angular/fire
   ```


## Running the Project

To run the full project (both frontend and backend):

1. **Run Backend**
   Open a terminal, navigate to your backend directory, and run:
   ```bash
   npm start
   ```

2. **Run Frontend**
   In a new terminal, navigate to your frontend directory, and run:
   ```bash
   ng serve
   ```

The frontend will run at `http://localhost:4200` and the backend at `http://127.0.0.1:3000`.

---

## Setting Authentication Sites for Google

To ensure Google login works, the domain needs to be set in Firebase's authentication settings.

1. **Add Authorized Domains in Firebase**
   - Go to your Firebase project and navigate to **Authentication** > **Settings**.
   - Under **Authorized domains**, add the following:
     - `localhost` for local development.
     - Your production domain (e.g., `your-domain.com`).

2. **Configure OAuth Consent Screen**
   - Go to the **Google Cloud Console**.
   - Navigate to **APIs & Services** > **OAuth consent screen**.
   - Ensure your application is listed and verified, and that the authorized domain for OAuth matches your app’s domain.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

[API DOCUMENTAION ](https://documenter.getpostman.com/view/33513010/2sA3XTfgG3)

 [Figma](https://www.figma.com/design/p3oBAjMPFbyGlSme7S2qeS/note-taker?node-id=0-1&t=MUhJfy7eszXfXPW9-1)
 

