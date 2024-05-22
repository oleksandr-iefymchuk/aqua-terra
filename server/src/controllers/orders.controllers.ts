import { Request, Response } from 'express';
import { orderModel } from '../models/orders.js';
import { Orders, User } from '../interfaces.js';

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as Request & { user?: User }).user;

    if (user) {
      const orders: Orders[] | null = await orderModel.find({ 'user._id': user._id });
      res.json(orders);
    } else {
      res.status(401).json({ message: 'Не вдалося авторизуватися!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};
