import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorite.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, addFavorite); // Adicionar favorito
router.get("/", authMiddleware, getFavorites); // Listar favoritos
router.delete("/:id", authMiddleware, removeFavorite); // Remover favorito

export default router;
