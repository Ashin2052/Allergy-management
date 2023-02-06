import {applicationConfig} from '../src/configs/config';
import {close, dbConnect} from '../src/configs/dbConnect';
import AllergySchema from '../src/models/allergy.schema';
import {allergyFixtures} from './fixtures/allergy.fixtures';

describe('Users', () => {
    beforeAll(() => {
        dbConnect({db: applicationConfig.MONGODB_URI});
    });

    afterAll(() => {
        close();
    });

    // Creation
    describe('Allergy Creation', () => {
        it('Should add a new allergy', async () => {
            const createdAllergy = await AllergySchema.create(allergyFixtures);
            expect(createdAllergy.name).toEqual('covid');
        });
    });
})