import { requiredAuth, validateRequest, doRequest } from '@mobileorg/common-lib';
import express, { Response, Request } from 'express';
import { body } from 'express-validator';

import { Route } from '../models/route';

const router = express.Router();

router.post(
  '/api/routes',
  requiredAuth,
  [
    body('startLocation').not().isEmpty().withMessage('start location required'),
    body('type').not().isEmpty().withMessage('type required'),
    body('vehicleId').not().isEmpty().withMessage('vehicle required'),
    body('startLocation').not().isEmpty().withMessage('starting point is required'),
    body('endLocation').not().isEmpty().withMessage('end point is required'),
    body('description').not().isEmpty().withMessage('description is required'),
    body('startDate').not().isEmpty().withMessage('starting date is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const {
        startLocation,
        type,
        vehicleId,
        state,
        endLocation,
        estimatedTime,
        userImage,
        description,
        startDate,
        rating,
        capacity,
      } = req.body;

      const route = Route.build({
        userId: req.currentUser!.id,
        type,
        startLocation,
        endLocation,
        availableTime: 'teste',
        vehicleId,
        state: state || 'unavailable',
        description,
        estimatedTime,
        startDate,
        userImage: userImage || '',
        rating: rating || 0,
        capacity: capacity || 0,
        actualCapacity: capacity || 0,
      });
      await route.save();

      // await new RouteCreatedPublisher(natsWrapper.client).publish({
      //   id: route.id,
      //   type: route.type,
      //   userId: route.userId,
      //   startLocation: route.startLocation,
      //   endLocation: route.endLocation,
      //   availableTime: route.availableTime,
      //   vehicleId: route.vehicleId,
      //   state: route.state,
      //   description: route.description,
      //   estimatedTime: route.estimatedTime,
      //   startDate: route.startDate,
      //   userImage: route.userImage,
      //   capacity: route.capacity,
      //   actualCapacity: route.actualCapacity,
      // });

      // const routes = Routes.build({
      //   id: route.id,
      //   capacity: route.capacity,
      // });
      // await routes.save();

      await doRequest(`http://localhost:3002/api/order/newRoute`, { id: route.id, capacity: route.capacity }, 'POST');

      res.status(201).send(route);
    } catch (error) {
      console.log(error);
      res.status(300).send(error);
    }
  }
);

export { router as createRouteRouter };
