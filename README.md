# Job Application Manager

<div id="top"></div>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

<!-- ABOUT THE PROJECT -->

## About The Project

MERN Stack Application for tracking Job Search Process

### Features

-   Login / Sign-up
-   Edit user-data
-   Add jobs
-   Browse user's jobs with (search + filter) feature
-   Display jobs-Matrics
-   Role Based Access

### Built With

-   React
-   React Router
-   styled-components
-   Node.js
-   Express
-   MongoDB

### Demo Images

<img src="./github_demo_images/demo1.png" style="zoom:50%;" />
<!-- <br />
<img src="./github_demo_images/demo2.png" style="zoom:50%;" />
<br />
<img src="./github_demo_images/demo3.png" style="zoom:50%;" /> -->

---

#### Validation

-   **Email validation**: as per **RFC2822** standards.
-   **Password validation**:
    -   The password must be more than **6** characters.
        | Sample Email | Sample Password |
        | --------------- | -------- |
        | testemail@gmail.com | 4?4W+HRLe"E |

---

## Getting Started

This project require some perquisites and dependencies to be installed, you can find the instructions below:

> To get a local copy, follow these simple steps :

### Installation

#### installing Locally

1. Clone the repo
    ```sh
    git clone https://github.com/xingkongzyx/Job-Application-Manager.git
    ```
2. go to client folder and server folder

    ```sh
    cd client
    ```

    and

    ```sh
    cd server
    ```

3. install dependencies on these two folders

    ```bash
    npm install
    ```

4. Environmental Variables Set up

    - Here are the environmental variables that needs to be set in the `.env` file in the **server directory**.
    - These are the default setting that I used for development, but you can change it to what works for you.

    ```
      PORT=5000
      MONGO_URL=<Your mongodb url>
      JWT_SECRET=<any secret value of your choice>
      JWT_LIFETIME=1d
    ```

5. Run development server

    ```sh
    npm start
    ```

---

### Ports and EndPoints

#### Ports

-   FrontEnd Development Server runs on port `3000`
-   BackEnd Development Server runs on port `5000`

#### API endpoints

**Main URL**: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)

-   **Auth**

    -   Register User: [http://localhost:5000/api/v1/auth/register](http://localhost:5000/api/v1/auth/register) [POST]
    -   Register User: [http://localhost:5000/api/v1/auth/login](http://localhost:5000/api/v1/auth/login) [POST]
    -   Update User: [http://localhost:5000/api/v1/auth/updateUser](http://localhost:5000/api/v1/auth/updateUser) [PATCH]

-   **Jobs**

    -   Get all jobs: [http://localhost:5000/api/v1/jobs](http://localhost:5000/api/v1/jobs) [GET]
    -   Create job: [http://localhost:5000/api/v1/jobs](http://localhost:5000/api/v1/jobs) [POST]
    -   Update job: [http://localhost:5000/api/v1/jobs/:id](http://localhost:5000/api/v1/jobs/:id) [PATCH]
    -   Delete job: [http://localhost:5000/api/v1/jobs/:id](http://localhost:5000/api/v1/jobs/:id) [DELETE]
    -   Get stats: [http://localhost:5000/api/v1/jobs/stats](http://localhost:5000/api/v1/jobs/stats) [Get]

<p align="right">(<a href="#top">back to top</a>)</p>
