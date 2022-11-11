const express = require("express");

const databaseFunctions = require("./config/db.config");
const { APP_RUNNING_PORT } = require("./config/env.config");
const router = require("./router/router");

// Database connection
databaseFunctions.connectDatabase();
databaseFunctions.listtDatabases();

// Routes configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v3/app",router);

//  Listening to the port
app.listen(APP_RUNNING_PORT, () => {
    console.log(`Server is running on port ${APP_RUNNING_PORT}`);
})
