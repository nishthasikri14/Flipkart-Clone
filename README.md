# 🛒 Flipkart Ecosystem Clone

A sophisticated full-stack e-commerce solution designed to replicate the core functionalities of Flipkart. This project utilizes the **PERN stack** (PostgreSQL, Express, React, Node.js) to provide a seamless shopping experience, from product discovery to secure checkout.


## 🚀 Deployment Status
- **Frontend Hosting:** [Your Vercel Link Here]
- **Backend API:** [Your Render/Railway Link Here]
- **Database:** Hosted on Neon PostgreSQL Cloud


## 🔥 Core Functionality
- **Dynamic Product Gallery:** Managed via Redux for real-time state updates.
- **Robust Authentication:** Secure user onboarding and login sessions.
- **Advanced Cart Logic:** Persistent cart management with price calculations.
- **Integrated Payments:** End-to-end **Razorpay** payment gateway integration (Test Mode).
- **Modern UI/UX:** Crafted with Material UI for a premium, responsive look and feel.

---

## 🛠️ Technical Architecture
- **Frontend:** React JS, Redux, Material UI, Axios
- **Backend:** Node.js, Express Framework
- **Database:** PostgreSQL (Relational Database Management)
- **Tools:** Git, GitHub, Vercel, Render


## ⚙️ Project Setup & Installation

### 1. Repository Initialization
### 1. Repository Initialization
git clone [https://github.com/nishthasikri14/flipkart-clone.git](https://github.com/nishthasikri14/flipkart-clone.git)
cd flipkart-clone
2. Server Configuration
Enter the server directory: cd server
Install dependencies: npm install
Configure environment variables in a .env file:
DATABASE_URL = Your cloud postgres connection string
RAZORPAY_KEY_ID = Your Razorpay API Key
RAZORPAY_KEY_SECRET = Your Razorpay Secret Key
Launch backend: npm start
3. Client Configuration
Enter the client directory: cd ../client
Install dependencies: npm install
Launch frontend: npm start

📦 Deployment Workflow
Frontend (Vercel)
Import: Select the GitHub repository.
Root Directory: Set to client.
Framework: Create React App.
Backend (Render)
Service Type: Web Service.
Root Directory: Set to server.
Environment: Add all .env keys in the dashboard settings.

/* NOTE ON IMAGE STORAGE:
We are using locally downloaded images in the 'public' folder rather than 
storing binary image data (BLOBs) directly in the PostgreSQL database.

REASONS:
1. Performance: Serving static files from the public folder is significantly 
   faster than fetching large binary data from a database query.
2. Scalability: Database size stays small, making backups and migrations easier.
3. Best Practice: In production, these would typically be hosted on a CDN 
   (like Cloudinary or AWS S3) and only their URLs would be stored in the DB.
*/

👨‍💻 Developer
Nishtha Sikri
