"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FacebookController_1 = require("../controllers/FacebookController");
const router = (0, express_1.Router)();
router.get("/auth/facebook", FacebookController_1.redirectToFacebook);
router.get("/auth/facebook/callback", FacebookController_1.handleFacebookCallback);
exports.default = router;
