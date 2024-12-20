"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRegistry = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const addRegistry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, quantity, date } = req.body;
    if (!name || !quantity || !date) {
        res.status(400).send('Missing required fields');
    }
    const newEntry = `"${name}",${quantity},${date}\n`;
    const filePath = path_1.default.join(__dirname, '../../public/dataset/MedicamentsDataset.csv');
    fs_1.default.appendFile(filePath, newEntry, (err) => {
        if (err) {
            return res.status(500).send('Failed to write to file');
        }
        res.status(200).send('Entry added successfully');
    });
});
exports.addRegistry = addRegistry;
