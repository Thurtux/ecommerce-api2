import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import favoriteRoutes from "./routes/favorite.routes"; // 📌 Rota de favoritos

dotenv.config(); // 📌 Carrega as variáveis do .env

const app = express();

// 📌 Corrigindo CORS para aceitar autenticação (cookies/tokens)
app.use(cors({
  origin: ["http://localhost:3000", "https://ecommercesolid4.web.app"], // 🔥 Adiciona o Firebase
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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
