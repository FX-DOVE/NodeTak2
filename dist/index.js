"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbconnect_1 = __importDefault(require("./databaseconnection/dbconnect"));
const Router_1 = __importDefault(require("./router/Router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", Router_1.default);
app.listen(PORT, () => {
    (0, dbconnect_1.default)();
    console.log(`Server running on http://localhost:${PORT}/api/notes`);
});
