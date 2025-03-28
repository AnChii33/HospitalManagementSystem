
# 🏥 Hospital OPD and Pathology Management System

## 🚀 Technology Stack
- **Frontend:** Next.js (React framework)  
- **Backend:** Java Spring Boot  
- **Database:** MongoDB  

## 📋 Prerequisites
Ensure you have the following installed on your system:  
- [Node.js](https://nodejs.org/) (v18 or higher recommended)  
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (v17 or higher recommended)  
- [MongoDB](https://www.mongodb.com/) (with a running instance)  

## ⚙️ Installation
1. **Clone the repository:**  
   ```sh
   git clone <repository-url>
   cd hospital-management-system
   ```

2. **Environment Variables:**  
   - Create a `.env` file in the `backend` directory by copying the provided `.env.example` file:  
     ```sh
     cp .env.example .env
     ```
   - Update the `.env` file with your MongoDB connection details (e.g., database URL, username, and password).  

3. **Frontend Setup:**  
   ```sh
   cd frontend
   npm install
   ```

4. **Backend Setup:**  
   Ensure MongoDB is running and update application properties if needed.  
   ```sh
   cd backend
   ./mvnw spring-boot:run
   ```

## ▶️ Running the Application
1. Start the **backend**:  
   ```sh
   cd backend
   ./mvnw spring-boot:run
   ```

2. Start the **frontend**:  
   ```sh
   cd frontend
   npm run dev
   ```

3. Access the application at: [http://localhost:3000](http://localhost:3000)
