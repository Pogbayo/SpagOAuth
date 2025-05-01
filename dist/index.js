"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const RefreshToken_1 = require("./Middleware/RefreshToken");
const GoogleRoute_1 = __importDefault(require("./routes/GoogleRoute"));
const TwitterRoute_1 = __importDefault(require("./routes/TwitterRoute"));
const FacebookRoute_1 = __importDefault(require("./routes/FacebookRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5173;
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.engine('pug', require('pug').__express);
app.set("views", path_1.default.join(__dirname, "../views"));
app.set('view engine', 'pug');
app.set('view engine', 'pug');
app.use(RefreshToken_1.refreshAccessToken);
app.get("/", (req, res) => {
    const user = req.session.user || null;
    res.render("index", { user });
});
app.use('/', GoogleRoute_1.default);
app.use('/', TwitterRoute_1.default);
app.use("/", FacebookRoute_1.default);
app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}\nVisit: http://localhost:${PORT}`);
});
