# Welcome to DashboardX

![dashboard page preview](https://github.com/raihan-ramadhan/admin-dahsboard-ecommerce/assets/116264857/08ea1d37-6c6c-4950-8d70-8cb182686432)
![geography page preview](https://github.com/raihan-ramadhan/admin-dahsboard-ecommerce/assets/116264857/ba0f8b70-b850-4dde-ab21-0c312993e759)
![products page preview](https://github.com/raihan-ramadhan/admin-dahsboard-ecommerce/assets/116264857/438a9428-7108-44ba-a447-421e932d55b0)


## About DashboardX

Features:

- Great ui and ux with Material UI component and icon
- Amazing looking chart with [nivo chart](https://nivo.rocks/)
- Full responsivity and mobile UI (still on process)
- state management with redux toolkit
- Light / Dark mode with redux persist and system preference
- query request with RTK query
- Typesafety for frontend with typescript
- ODM using Mongoose for backend
- use pattern MVC with express as main framework for backend

## Getting Started

### Prerequisites

Node version 18.x.x

### Installation

1. Clone the repository
   ```shell
   git clone https://github.com/raihan-ramadhan/admin-dahsboard-ecommerce.git
   ```
1. make two terminal in your code editor then =>

   1. Enter the folder and install dependency in one terminal

   ```shell
   cd frontend
   npm install
   ```

   1. Enter the folder and install dependency in other terminal

   ```shell
   cd backend
   npm install
   ```

### Setup

1.  Setup .env.local file on frontend
    ```js
    VITE_BACKEND_URL=http://localhost:5001
    ```
1.  Setup .env file on backend

    ```js
    MONGO_URL=mongodb+srv://your_name:your_password@admin-dashboard-ecommer.tmorbdl.mongodb.net/MyAdminDashboard?retryWrites=true&w=majority
    PORT=5001
    ```

        > For the frontend, it's ".env.local," and for the backend, it's ".env."

### Start the app

run development frontend and backend on each terminal

```shell
npm run dev
```

---

this project from [Edroh](https://www.youtube.com/watch?v=0cPCMIuDk2I) that i upgraded in frontend side,

email me if you have question 👋
