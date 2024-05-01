//import { MediaInterface } from './media';
import mongoose, {Schema} from 'mongoose';


//const { Schema } = mongoose;

//const { ObjectId } = Types;

export interface UserInterface {
  username: string;
  password: string;
  //media: MediaInterface[];
}

export const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //media: [{ type: ObjectId, ref: 'Media' }]
});


const UserModel = mongoose.model<UserInterface>('User', UserSchema);

export default UserModel;