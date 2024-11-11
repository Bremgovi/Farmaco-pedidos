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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClients = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield prisma.clients.findMany();
        res.status(200).json(clients);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving clients: " + error });
    }
});
exports.getClients = getClients;
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, paternalSurname, maternalSurname, email, phone } = req.body;
        const newClient = yield prisma.clients.create({
            data: {
                name,
                paternalSurname,
                maternalSurname,
                email,
                phone,
            },
        });
        res.status(201).json(newClient);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating client: " + error });
    }
});
exports.createClient = createClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, paternalSurname, maternalSurname, email, phone } = req.body;
        const updatedClient = yield prisma.clients.update({
            where: { clientId: id },
            data: {
                name,
                paternalSurname,
                maternalSurname,
                email,
                phone,
            },
        });
        res.status(200).json(updatedClient);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating client: " + error });
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.clients.delete({
            where: { clientId: id },
        });
        res.status(200).json({ message: "Client deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting client: " + error });
    }
});
exports.deleteClient = deleteClient;
