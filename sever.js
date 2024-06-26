const express = require('express');
const cors = require("cors")
const app = express();
const db = require('./models/index');
const dotenv = require("dotenv");
const path = require("path");



var corsOption = {
    origin: "*",
  };
  db.sequelize
    .sync()
    .then(() => {
      console.log("Synced db.");

    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
  
  app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/Images', express.static(path.join(__dirname, 'Images')));
dotenv.config({ path: "./config.env" });

app.get("/",(req,res)=>{
    res.json({message: "Welcome to NodeJS application."})
});

require("./router/userRouter")(app);
require('./router/registrationRouter')(app);
require("./router/memberRouter")(app);
require ("./router/uploadRoute")(app);
require("./router/A_memberroute")(app);
app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})
