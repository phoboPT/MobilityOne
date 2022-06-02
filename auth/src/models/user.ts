import mongoose from 'mongoose';
import { Password } from '../services/password';
//Interface that describes a User typescipt porpuses
interface UserAttrs {
  email: string;
  password: string;
  name: string;
  photoUrl: string;
  rating: number;
  biography: string;
  contact: string;
  birthDate: string;
  risk: number;
  cardioIllnes: number;
  heartAtack: number;
  smoke: number;
  colesterol: number;
  diabetes: number;
  pressure: number;
  activity: number;
  balance: number;
  cronicDesease: number;
  medication: number;
  boneIllness: number;
  medicalSuvervision: number;
  artriteOrRelated: number;
  artriteMeds: number;
  articularProblems: number;
  injections: number;
  cancer: number;
  cancertType: number;
  cancerTreatment: number;
  heartProblem: number;
  controllingHeartCondition: number;
  irregularHeartStrokes: number;
  insufficentCardiac: number;
  activityCronicDesiese: number;
  highPressure: number;
  highPressureMeds: number;
  highPressureRelaxed: number;
  metabolicProblem: number;
  hipoglicemy: number;
  diabetesComplication: number;
  intenseExercise: number;
  mentalIllness: number;
  mentalIllnessMeds: number;
  downSindrome: number;
  breathingIllness: number;
  breathingIllnessMeds: number;
  lowOxygen: number;
  asmatic: number;
  highBloodPressure: number;
  spinal: number;
  spinalMeds: number;
  lowBloodPressure: number;
  bloodPressureSurges: number;
  stroke: number;
  strokeMeds: number;
  compromisedMobility: number;
  strokeOrMuscle: number;
  metabolicProblemMeds: number;
  metabolicOther: number;
  otherHealthProblems: number;
  concussion: number;
  otherProblems: number;
}

//Interface that describes a UserModel
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//Interface that describes the properties a Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  photoUrl: string;
  rating: number;
  briography: string;
  contact: string;
  birthDate: string;
  risk: number;
  cardioIllnes: number;
  heartAtack: number;
  smoke: number;
  colesterol: number;
  diabetes: number;
  pressure: number;
  activity: number;
  balance: number;
  cronicDesease: string;
  medication: number;
  boneIllness: number;
  medicalSuvervision: number;
  artriteOrRelated: number;
  artriteMeds: number;
  articularProblems: number;
  injections: number;
  cancer: number;
  cancertType: number;
  cancerTreatment: number;
  heartProblem: number;
  controllingHeartCondition: number;
  irregularHeartStrokes: number;
  insufficentCardiac: number;
  activityCronicDesiese: number;
  highPressure: number;
  highPressureMeds: number;
  highPressureRelaxed: number;
  metabolicProblem: number;
  hipoglicemy: number;
  diabetesComplication: number;
  intenseExercise: number;
  mentalIllness: number;
  mentalIllnessMeds: number;
  downSindrome: number;
  breathingIllness: number;
  breathingIllnessMeds: number;
  lowOxygen: number;
  asmatic: number;
  highBloodPressure: number;
  spinal: number;
  spinalMeds: number;
  lowBloodPressure: number;
  bloodPressureSurges: number;
  stroke: number;
  strokeMeds: number;
  compromisedMobility: number;
  strokeOrMuscle: number;
  metabolicProblemMeds: number;
  metabolicOther: number;
  otherHealthProblems: number;
  concussion: number;
  otherProblems: number;
  twoOrMoreProblems: number;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: true,
    },
    biography: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: false,
    },
    birthDate: {
      type: String,
      required: false,
    },
    risk: {
      type: Number,
      required: false,
    },

    cardioIllnes: {
      type: Number,
      required: false,
    },
    heartAtack: {
      type: Number,
      required: false,
    },
    smoke: {
      type: Number,
      required: false,
    },
    colesterol: {
      type: Number,
      required: false,
    },
    diabetes: {
      type: Number,
      required: false,
    },
    pressure: {
      type: Number,
      required: false,
    },
    activity: {
      type: Number,
      required: false,
    },
    balance: {
      type: Number,
      required: false,
    },
    cronicDesease: {
      type: Number,
      required: false,
    },
    medication: {
      type: Number,
      required: false,
    },
    boneIllness: {
      type: Number,
      required: false,
    },
    medicalSuvervision: {
      type: Number,
      required: false,
    },
    artriteOrRelated: {
      type: Number,
      required: false,
    },
    artriteMeds: {
      type: Number,
      required: false,
    },
    articularProblems: {
      type: Number,
      required: false,
    },
    injections: {
      type: Number,
      required: false,
    },
    cancer: {
      type: Number,
      required: false,
    },
    cancertType: {
      type: Number,
      required: false,
    },
    cancerTreatment: {
      type: Number,
      required: false,
    },
    heartProblem: {
      type: Number,
      required: false,
    },
    controllingHeartCondition: {
      type: Number,
      required: false,
    },
    irregularHeartStrokes: {
      type: Number,
      required: false,
    },
    insufficentCardiac: {
      type: Number,
      required: false,
    },
    activityCronicDesiese: {
      type: Number,
      required: false,
    },
    highPressure: {
      type: Number,
      required: false,
    },
    highPressureMeds: {
      type: Number,
      required: false,
    },
    highPressureRelaxed: {
      type: Number,
      required: false,
    },
    metabolicProblem: {
      type: Number,
      required: false,
    },
    hipoglicemy: {
      type: Number,
      required: false,
    },
    diabetesComplication: {
      type: Number,
      required: false,
    },
    intenseExercise: {
      type: Number,
      required: false,
    },
    mentalIllness: {
      type: Number,
      required: false,
    },
    mentalIllnessMeds: {
      type: Number,
      required: false,
    },
    downSindrome: {
      type: Number,
      required: false,
    },
    breathingIllness: {
      type: Number,
      required: false,
    },
    breathingIllnessMeds: {
      type: Number,
      required: false,
    },
    lowOxygen: {
      type: Number,
      required: false,
    },
    asmatic: {
      type: Number,
      required: false,
    },
    highBloodPressure: {
      type: Number,
      required: false,
    },
    spinal: {
      type: Number,
      required: false,
    },
    spinalMeds: {
      type: Number,
      required: false,
    },
    lowBloodPressure: {
      type: Number,
      required: false,
    },
    bloodPressureSurges: {
      type: Number,
      required: false,
    },
    stroke: {
      type: Number,
      required: false,
    },
    strokeMeds: {
      type: Number,
      required: false,
    },
    compromisedMobility: {
      type: Number,
      required: false,
    },
    strokeOrMuscle: {
      type: Number,
      required: false,
    },
    metabolicProblemMeds: {
      type: Number,
      required: false,
    },
    metabolicOther: {
      type: Number,
      required: false,
    },
    otherHealthProblems: {
      type: Number,
      required: false,
    },
    concussion: {
      type: Number,
      required: false,
    },
    otherProblems: {
      type: Number,
      required: false,
    },
    twoOrMoreProblems: {
      type: Number,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
