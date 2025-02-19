import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Criar um produto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, imageUrl } = req.body;

    const product = await prisma.product.create({
      data: { name, description, price, imageUrl },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto." });
  }
};

// Buscar todos os produtos
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};

// Buscar produto por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; // Agora é uma string

    const product = await prisma.product.findUnique({
      where: { id }, // Prisma espera string
    });

    if (!product) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

// Atualizar produto por ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; // Mantém como string

    const { name, description, price, imageUrl } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, imageUrl },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

// Deletar produto por ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; // Mantém como string

    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
};
