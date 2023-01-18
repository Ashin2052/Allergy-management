import mongoose, {Schema, model, Document} from 'mongoose';

export interface IAllergy {
    id?:string,
    name: string,
    description: string,
    severity: severityEnum,
    symptoms: string,
    cloudinaryId: string,
    image?: any,
    notes?: string
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
        },
        symptoms: {
            type: String,
            required: true,
        },
    notes: {
            type:String
    }
    },
    {
        timestamps: true,
        id: true,
        toJSON: {
            transform(doc, all) {
                all.id = all._id
                delete all._id
            }
        }
    });

export default model<IAllergy>("Allergy", AllergySchema)
