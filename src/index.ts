import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import favoriteRoutes from "./routes/favorite.routes"; // 📌 Rota de favoritos

dotenv.config(); // 📌 Carrega as variáveis do .env

const app = express();

// 📌 Corrigindo CORS para aceitar autenticação (cookies/tokens)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // 🔹 URL do frontend (mude para produção)
    credentials: true, // 🔹 Permite cookies/tokens JWT
  })
);

app.use(express.json());

// 📌 Rotas
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/favorites", favoriteRoutes); // 📌 Rota de favoritos

const PORT = process.env.PORT || 8080;

// 📌 Iniciando o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
