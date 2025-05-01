import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import { refreshAccessToken } from "./Middleware/RefreshToken";
import GoogleRoute from "./routes/GoogleRoute";
import TwitterRoute from "./routes/TwitterRoute";
import FacebookRoute from "./routes/FacebookRoute";

const app = express();
const PORT = process.env.PORT || 5173;


app.use(cookieParser());

app.use(session({
    secret:process.env.SESSION_SECRET as string,
    resave:false,
    saveUninitialized:true
}));

app.engine('pug', require('pug').__express)


app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'pug');

app.set('view engine', 'pug');

app.use(refreshAccessToken);

app.get("/", (req, res) => {
  const user = req.session.user || null;
  res.render("index",{user});
});

app.use('/', GoogleRoute);
app.use('/', TwitterRoute);
app.use("/", FacebookRoute);


app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}\nVisit: http://localhost:${PORT}`);
});
