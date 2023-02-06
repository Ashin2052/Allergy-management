import {applicationConfig} from "../src/configs/config";
import {close, dbConnect} from "../src/configs/dbConnect";
import AllergySchema from "../src/models/allergy.schema";
import {allergyFixtures} from "../src/test/fixtures/allergy.fixtures";

describe("Users", () => {
    beforeAll(() => {
        dbConnect({db: applicationConfig.MONGODB_URI});
    });

    afterAll(() => {
        return close();
    });

    // Creation
    describe("User Creation", () => {
        it("Should add a new allergy", async () => {
            const createdAllergy = await AllergySchema.create(allergyFixtures);
            expect(createdAllergy.name).toEqual('covid');
        });
    });
})