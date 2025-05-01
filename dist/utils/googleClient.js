"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const google_auth_library_1 = require("google-auth-library");
exports.client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
