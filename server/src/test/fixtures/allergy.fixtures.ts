import {IAllergy, severityEnum} from "../../models/allergy.schema";
import {faker} from '@faker-js/faker';

export const allergyFixtures: IAllergy = {
    cloudinaryId: faker.datatype.uuid(),
    description: faker.datatype.string(),
    id: faker.datatype.uuid(),
    image: faker.datatype.string(),
    name: faker.datatype.string(),
    notes: faker.datatype.string(),
    severity: severityEnum.high,
    symptoms: faker.datatype.string(),

}