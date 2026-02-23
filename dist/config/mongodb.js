"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const URI_DB = process.env.URI_DB || "mongodb://127.0.0.1:27017/db_backend_utn "
let URI_DB;
URI_DB = '' + process.env.URI_DB;
const connectDb = async () => {
    try {
        await (0, mongoose_1.connect)(URI_DB);
        console.log("✅ Conectado con éxito a Mongodb");
    }
    catch (error) {
        console.log("❌ No se pudo conectar con la base de datos :(");
    }
};
exports.connectDb = connectDb;
