import mongoose, {Schema, model, Document} from 'mongoose';

export interface IAllergy {
    id?:string,
    name: string,
    description: string,
    severity: severityEnum,
    symptoms: string,
    cloudinaryId: string,
    image?: any,
}

export enum severityEnum {
    low ='LOW',
    medium ='MEDIUM',
    high ='HIGH',
}

const AllergySchema = new Schema<IAllergy>({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        severity: {
            type: String,
            enum: severityEnum,
            required: true,
        },
        cloudinaryId: {
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
