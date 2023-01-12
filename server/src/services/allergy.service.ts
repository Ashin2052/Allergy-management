import AllergySchema, {IAllergy} from "../models/allergy.schema";
import {Ipagination} from "../types/shared.types";

const cloudinary = require("../configs/cloudinary.config");


export const getAllergies = async (pagination?: Ipagination): Promise<any> => {
    try {
        const allergies = await AllergySchema.find()
            .limit(pagination.limit)
            .skip((pagination.page - 1) * pagination.limit)
            .exec();
        // get total documents in the Posts collection
        const count = await AllergySchema.count();
        return ({
            allergies,
            totalPages: Math.ceil(count / pagination.limit),
            currentPage: pagination.page
        })
    } catch (err) {
        return err;
    }
}

export const createAllergy = async (allergy: IAllergy, file: any): Promise<any> => {
    try {
        const result = await cloudinary.uploader.upload(file.path);
        allergy.cloudinaryId = result.public_id;
        allergy.image = result.secure_url;
        return AllergySchema.create(allergy);
    } catch (err) {
        return err;
    }
}

export const updateAllergy = async (allergy: IAllergy, file: any): Promise<any> => {
    try {
        // Delete image from cloudinary
        if (file) {
            await cloudinary.uploader.destroy(allergy.cloudinaryId);
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(file.path);
            allergy.cloudinaryId = result.public_id;
            allergy.image = result.secure_url;
        }

        return await AllergySchema.findByIdAndUpdate(allergy.id, allergy, {
            new: true
        });
    } catch (err) {
        return err
    }
}

export const getById = async (id) => {
    return AllergySchema.findById(id);
}
