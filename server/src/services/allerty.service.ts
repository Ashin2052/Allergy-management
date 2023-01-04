import AllergySchema, {IAllergy} from "../models/Allergy";

export const createAllergy = async (allergy: IAllergy): Promise<any> =>{
    return AllergySchema.findOneAndUpdate({'id': 22}, {allergy}, {
        new: true,
        upsert: true // Make
    });
}

