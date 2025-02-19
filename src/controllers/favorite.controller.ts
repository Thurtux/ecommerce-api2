import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

// Estendendo a interface do Express para reconhecer `req.user`
declare module "express" {
  export interface Request {
    user?: User;
  }
}

const prisma = new PrismaClient();

// Adicionar um produto aos favoritos
export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id; // Pegando o ID do usuário autenticado

    if (!userId) {
      res.status(401).json({ error: "Usuário não autenticado" });
      return;
    }

    const favorite = await prisma.favoriteProduct.create({
      data: {
        userId,
        productId,
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error("Erro ao adicionar produto aos favoritos:", error);
    res.status(500).json({ error: "Erro ao adicionar produto aos favoritos" });
  }
};

// Listar favoritos do usuário
export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "Usuário não autenticado" });
      return;
    }

    const favorites = await prisma.favoriteProduct.findMany({
      where: { userId },
      include: { product: true },
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    res.status(500).json({ error: "Erro ao buscar favoritos" });
  }
};

// Remover um produto dos favoritos
export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "Usuário não autenticado" });
      return;
    }

    await prisma.favoriteProduct.deleteMany({
      where: {
        id,
        userId,
      },
    });

    res.status(200).json({ message: "Produto removido dos favoritos" });
  } catch (error) {
    console.error("Erro ao remover produto dos favoritos:", error);
    res.status(500).json({ error: "Erro ao remover produto dos favoritos" });
  }
};
