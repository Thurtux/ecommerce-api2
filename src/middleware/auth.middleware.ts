import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ error: "Acesso não autorizado. Token ausente." }) as unknown as void;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user: User | null = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado." }) as unknown as void;
    }

    req.user = user;
    return next(); // Isso garante que o TypeScript entenda que `next()` finaliza a função
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." }) as unknown as void;
  }
};

export default authMiddleware;
