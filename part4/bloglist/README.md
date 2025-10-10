## BlogList Backend - Part 4

This project is a complete and secure RESTful API for a blogging platform. The interface is designed following RESTful principles, providing secure and efficient endpoints for managing users and blog articles.

The application ensures strict authorization constraints, preventing users from deleting or updating blogs created by others. All sensitive operations are protected by JSON Web Tokens (JWT).

=======================================================================================
## Key Technologies and Libraries (Tech Stack)
=======================================================================================
**Node.js & Express**
Runtime environment and primary framework for building the API server.

**MongoDB / Mongoose**
NoSQL database and Object Data Modeling (ODM) library for data interaction.

**Bcrypt**
Used to securely hash user passwords before storage.

**JSON Web Token (JWT)**
Used for authentication and verifying user identity on protected routes.
=======================================================================================


## API Key Features (Endpoints)
## The API exposes the following main routes:
=======================================================================================
### 🧑‍💻 Users (/api/users)
=======================================================================================
| Method | Route   | Description | 
| GET    | "/"     | Fetches all users, populating their associated blogs. |
| POST   |"/"      | Registers a new user (requires username and password, minimum 3 chars). |
| GET    |"/:id"   | Retrieves a specific user by ID. |
| PUT    | "/:id"  | Updates non-sensitive user data (Name only). Rejects requests attempting to change the password or username. |


=======================================================================================
### 📝 Blogs (/api/blogs)
=======================================================================================
| Method | Route   | Description | 
| GET    | "/"     | Fetches all blogs, populating the author's user data. |
| POST   | "/"     | Creates a new blog, automatically linking it to the authenticated user via the token. |
| DELETE | "/:id"  | Deletes a specific blog. Only the owner of the blog is authorized to delete it. |
| PUT    | "/:id"  | Updates a specific blog (e.g., incrementing likes). |
| GET    | "/:id"  | Fetches blog item by id |

=======================================================================================
### 🔑 Authentication (/api/login)
=======================================================================================
| Method | Route   | Description | 
| POST   | "/" =>  | Logs the user in and issues a valid JWT for authenticating protected routes. |


=======================================================================================
## Setup and Running Locally
**Clone and Install:**
=======================================================================================
**Clone the repository:**
\`\`\`bash
git clone https://github.com/bakhouya/fullstackopen-submissions.git
\`\`\`
**Navigate to the folder:**
\`\`\`bash
cd fullstackopen-submissions/part4/bloglist
\`\`\`
**Install dependencies:**
\`\`\`bash
npm install
\`\`\`

**Create a .env file in the root directory of the project and add the following variables:**
\`\`\`bash
PORT=3003
MONGODB_URL=mongodb://------
TEST_MONGODB_URI==mongodb://------
SECRET=your-secret-key
\`\`\`

**Run the server:**
\`\`\`bash
npm run dev
\`\`\`
**or:**
\`\`\`bash
npm start
\`\`\`





