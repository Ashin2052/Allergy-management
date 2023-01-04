import mongoose, {Schema, model, Document} from 'mongoose';

export interface IAllergy {
    id?:string,
    name: string;
    variant: string,
    image: string,
}

const AllergySchema = new Schema<IAllergy>({
        name: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    });

export default model<IAllergy>("Allergy", AllergySchema)
