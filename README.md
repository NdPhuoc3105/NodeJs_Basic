# NodeJs_Basic

`Getting Started with Create NodeJs App - A Server-Side Rendering.`
\
Available Scripts
In the project directory, you can run:

- Topic:
  - [Running](#running)
  - [Routers & Express](#routers--express)
  - [MVC architecture](#mvc-architecture)
  - [REST APIs](#rest-apis) 
  - [Database (MySQL/XAMPP)](#database-mysqlxampp)
  - [Testing `APIs`](#testing-apis)
  - [MiddleWare](#middleware) 



## Running:
 `npm start` \
 Runs the app in the development mode. \
 Open `http://localhost:8080` to view it in your browser.
 The page will reload when you make changes. \
 You may also see any lint errors in the console terminal.


## Routers & Express:
 - Routers for Clients that request into Website is congfig on [Web.js](./src/routes/web.js).
 - Express is saving on [Package.json](./package.json), you can clone this code and type `npm install`.
 
## MVC architecture:
 - MVC architecture has 3 main ingredients: `Model` - `Views` - `Controllers`.
   - `Model`: connect into your database .
   - `Views`: Render data and anything for Client's request.
   - `Controllers`: config and manage data / router, `Controller` is the middle of `Model` and `Views`.
## REST APIs:
 - REST APIs is config on [api-routes-file](./src/routes/api.js).
 - APIs can export, connect DB and using CRUD without action on server-side rendering.
 - Front-End Developer can use APIs to connect DataBase.
## Database (MySQL/XAMPP):
 - SQL is useful for CRUD in database (the SQLite excute)
 - Using XAMPP to create a Database that had `nodejsbasic` db and a table `users` inside.
 - Table `users` has 5 fields: `id`, `firstName`, `lastName`, `email`, `address` ( `id` id the primary-key )
## Testing `APIs`:
 - from `google` download [POSTMAN](https://www.postman.com/downloads/) and setup into PC.
 - Login with account and using APIs to test on.
## MiddleWare:
 - Logging Morgan to check-log on console
 - Using middleware in server controls and on routes before controllers
