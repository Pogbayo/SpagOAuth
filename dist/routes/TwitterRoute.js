"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const twitterController_1 = require("../controllers/twitterController");
const router = express_1.default.Router();
router.get('/auth/twitter', twitterController_1.startTwitterAuth);
router.get('/auth/twitter/callback', twitterController_1.twitterCallback);
exports.default = router;
