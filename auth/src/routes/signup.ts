import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@mobileorg/common-lib';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
    body('name').trim().isLength({ min: 4, max: 20 }).withMessage('Name must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name, photoUrl, biography, contact, birthDate } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use', {
        from: 'Signup, email is already in use',
      });
    }

    const user = User.build({
      email,
      password,
      rating: 0,
      name: name || '',
      photoUrl:
        photoUrl ||
        'https://toppng.com/uploads/preview/app-icon-set-login-icon-comments-avatar-icon-11553436380yill0nchdm.png',
      biography: biography || '',
      contact: contact || '',
      birthDate: birthDate || '',
      risk: '0',
      cardioIllnes: '0',
      heartAtack: '0',
      smoke: '0',
      colesterol: '0',
      diabetes: '0',
      pressure: '0',
      activity: '0',
      balance: '0',
      cronicDesease: '0',
      medication: '0',
      boneIllness: '0',
      medicalSuvervision: '0',
      artriteOrRelated: '0',
      artriteMeds: '0',
      articularProblems: '0',
      injections: '0',
      cancer: '0',
      cancertType: '0',
      cancerTreatment: '0',
      heartProblem: '0',
      controllingHeartCondition: '0',
      irregularHeartStrokes: '0',
      insufficentCardiac: '0',
      activityCronicDesiese: '0',
      highPressure: '0',
      highPressureMeds: '0',
      highPressureRelaxed: '0',
      metabolicProblem: '0',
      hipoglicemy: '0',
      diabetesComplication: '0',
      intenseExercise: '0',
      mentalIllness: '0',
      mentalIllnessMeds: '0',
      downSindrome: '0',
      breathingIllness: '0',
      breathingIllnessMeds: '0',
      lowOxygen: '0',
      asmatic: '0',
      highBloodPressure: '0',
      spinal: '0',
      spinalMeds: '0',
      lowBloodPressure: '0',
      bloodPressureSurges: '0',
      stroke: '0',
      strokeMeds: '0',
      compromisedMobility: '0',
      strokeOrMuscle: '0',
      metabolicProblemMeds: '0',
      metabolicOther: '0',
      otherHealthProblems: '0',
      concussion: '0',
      otherProblems: '0',
      illness: '0',
      cronicIllness: '0',
      medications: '0',
      boneIllnessList: '0',
      twoOrMoreProblems: '0',
    });
    await user.save();
    //Generate and setting token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY || 'MySeCrEt'
    );

    req.session = { jwt: userJwt };
    res.status(201).send(user);
  }
);

export { router as signupRouter };
