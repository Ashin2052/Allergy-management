import AllergySchema, {IAllergy} from "../models/allergy.schema";
import {Ipagination} from "../types/shared.types";

const cloudinary = require("../configs/cloudinary.config");

/**
 * Get allergies
 * @param {object} pagination
 */
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
        throw err;
    }
}

/**
 * Register allergy
 * @param {object} allergy
 * @param {object} file
 */
export const createAllergy = async (allergy: IAllergy, file: any): Promise<any> => {
    try {
        const result = await cloudinary.uploader.upload(file.path);
        allergy.cloudinaryId = result.public_id;
        allergy.image = result.secure_url;
        return AllergySchema.create(allergy);
    } catch (err) {
        throw err;
    }
}

/**
 * Register allergy
 * @param {string} id
 * @return {promise}
 */
export const deleteAllergy = async (id: string): Promise<any> => {
    try {
         await AllergySchema.findByIdAndDelete(id).then(value => {
                cloudinary.uploader.destroy(value.cloudinaryId);
            }
        );

        return id;
    } catch (err) {
        throw err;
    }
}


/**
 * Update allergy
 * @param {object} allergy
 * @param {string} id
 * @param {object} file
 * @return {promise}
 */
export const updateAllergy = async (allergy: IAllergy,id:string, file: any): Promise<any> => {
    try {

        const oldAllergy:any = await AllergySchema.findById(id).lean();
        // Delete image from cloudinary
        if (file) {
            await cloudinary.uploader.destroy(oldAllergy?.cloudinaryId);
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(file.path);
            allergy.cloudinaryId = result.public_id;
            allergy.image = result.secure_url;
        }
        else {
            allergy.cloudinaryId = oldAllergy.cloudinaryId;
            allergy.image = oldAllergy.secure_url;

        }
        return  AllergySchema.findByIdAndUpdate(id, allergy, {
            new: true
        });
    } catch (err) {
        throw err
    }
}

export const getById = async (id) => {
    return AllergySchema.findById(id);
}
