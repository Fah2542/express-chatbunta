require('dotenv').config({ path: './config.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4002;

const productRoute = require("./routes/productRoute");
const employeeRoute = require("./routes/employeeRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//ดึงค่า config ใน db.js มาใช้ใน app
require("./db")(app);

app.use("/product", productRoute);
app.use("/employee", employeeRoute);
app.use("/user", userRoute);

// Routing Table
app.get("/",(req, res)=>{
    res.send("Hello from index");
});

app.get("/login",(req, res)=>{
    res.send("Hello from login");
});

app.post("/register",(req, res)=>{
    console.log(req.body.name);
    console.log(req.body.email);
    res.send("Hello from register");
});


app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
});

