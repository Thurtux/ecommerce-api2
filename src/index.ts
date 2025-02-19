import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import favoriteRoutes from "./routes/favorite.routes"; // 📌 Adicionando rotas de favoritos

dotenv.config(); // Carrega as variáveis do .env

const app = express();

// 📌 Middlewares globais
app.use(cors());
app.use(express.json());

// 📌 Rotas
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/favorites", favoriteRoutes); // 📌 Adicionando rota de favoritos

const PORT = process.env.PORT || 8080;

// 📌 Iniciando o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
