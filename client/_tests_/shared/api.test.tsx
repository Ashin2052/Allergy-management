import MockAdapter from "axios-mock-adapter";
import callApi2, {axiosInstance} from "../../src/shared/api";
import {allergiesFixture} from "../fixtures/allergies";

const BASE_URL = 'http://localhost:8000'
describe("fetchUsers", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axiosInstance);
    });

    afterEach(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return allergy list", async () => {

            mock.onGet(`${BASE_URL}/api/allergy`).reply(200, allergiesFixture);

            // when
            let result;
            await callApi2({
                method: "get", url: `allergy`,
            }).then((data) => {
                result = data;
            })

            // then
            expect(mock.history.get[0].url).toEqual(`${BASE_URL}/api/allergy`);
            expect(result).toEqual(allergiesFixture);
        });
    });
});