import express, { Request, Response } from 'express';
import { requiredAuth, NotFoundError, NotAuthorizedError, OrderStatus } from '@mobileorg/common-lib';
import { Order } from '../models/order';
import { Route } from '../../../routes/src/models/route';

const router = express.Router();

router.delete('/api/orders/:orderId', requiredAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate('route');

  if (!order) {
    throw new NotFoundError({ details: 'error' });
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();


  const route = await Route.findById(order.route.id);
  if (route) {
    route.set({ actualCapacity: route.actualCapacity + 1 });
    await route.save();
  }

  res.status(204).send(order);
});

export { router as deleteOrderRouter };
