import mongoose, {Schema, model, Document} from 'mongoose';

export interface IUser {
    id?: string,
    name: string,
    email: string,
    password: string,
    role: ROlE,
    refreshToken?: string
}


type ROlE = 'ADMIN' | 'USER'
const UserSchema = new Schema<IUser>({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,

        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    });

export default model<IUser>("User", UserSchema)
