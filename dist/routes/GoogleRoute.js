"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GoogleController_1 = require("../controllers/GoogleController");
const router = (0, express_1.Router)();
router.get('/auth/google', GoogleController_1.redirectToGoogle);
router.get('/auth/google/callback', GoogleController_1.handleGoogleCallback);
router.get('/logout', GoogleController_1.logout);
exports.default = router;
