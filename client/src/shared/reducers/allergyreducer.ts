import {createAsyncThunk, createSlice, Draft, PayloadAction,} from "@reduxjs/toolkit";
import {Allergy, ApiErrorResponse,} from "../../types/shared.types";

import {create, edit, fetchAll, remove,} from "../../services/allergy.service";

interface IallergiesState {
    allergies: any;
    loading: boolean;
    isAdding: boolean;
    isEditing: boolean;
    error: ApiErrorResponse;
}

const initialState: IallergiesState = {
    allergies: [],
    loading: false,
    isAdding: false,
    isEditing: false,
    error: {
        data: {
            info: "",
        },
        message: "",
        status: 500,
    },
};

export const fetchAllergies = createAsyncThunk(
    "allergies/fetchAllAllergies",
    async (_, {rejectWithValue}) => {
        try {
            return await fetchAll();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const createAllergy = createAsyncThunk(
    "allergies/createAllergy",
    async (payload: object, {rejectWithValue}) => {
        try {
            return await create(payload);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const editAllergy = createAsyncThunk(
    "allergies/editAllergy",
    async (data: any, {rejectWithValue}) => {
        try {
            const {id, ...payload} = data;

            return await edit(id, payload);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const removeAllergy = createAsyncThunk(
    "allergies/removeAllergy",
    async (id: any, {rejectWithValue}) => {
        try {
            const res = await remove(id);
            return res;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const allergieslice = createSlice({
    name: "Allergy",
    initialState,

    reducers: {
        addAllergy: (state: Draft<IallergiesState>, action) => {
            state.allergies.push(action.payload.data);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllergies.pending, (state: Draft<IallergiesState>) => {
            state.loading = true;
        });

        builder.addCase(
            fetchAllergies.fulfilled, (state: Draft<IallergiesState>, action: PayloadAction<any>) => {
                state.loading = false;
                state.allergies = action.payload.data;
            }
        );


        builder.addCase(
            fetchAllergies.rejected,
            (state: Draft<IallergiesState>, action: PayloadAction<any>) => {
                state.loading = false;
                state.allergies = [];

                state.error = {
                    data: {
                        info: action.payload.data.info,
                    },
                    message: action.payload.message,
                    status: action.payload.status,
                };
            }
        );

        builder.addCase(createAllergy.pending, (state: Draft<IallergiesState>) => {
            state.isAdding = true;
        });

        builder.addCase(createAllergy.fulfilled, (state: Draft<IallergiesState>, action: any) => {
            state.isAdding = false;
            state.allergies = [...state.allergies, action.payload.data];
        });

        builder.addCase(createAllergy.rejected, (state: Draft<IallergiesState>, action: any) => {
            state.isAdding = false;
            state.error = action.payload;
        });

        builder.addCase(editAllergy.pending, (state: Draft<IallergiesState>) => {
            state.isEditing = true;
        });

        builder.addCase(editAllergy.fulfilled, (state: Draft<IallergiesState>, action: any) => {
            state.isEditing = false;

            const {data} = action.payload;

            state.allergies = state.allergies.map((item: Allergy) => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        ...data,
                    };
                }
                return item;
            });
        });

        builder.addCase(editAllergy.rejected, (state: Draft<IallergiesState>, action: any) => {
            state.isEditing = false;
            state.error = action.payload;
        });

        builder.addCase(removeAllergy.pending, (state: Draft<IallergiesState>) => {
            state.loading = true;
        });

        builder.addCase(removeAllergy.fulfilled, (state: Draft<IallergiesState>, action: any) => {
            state.loading = false;

            const {id} = action.payload.data.info;


            state.allergies = state.allergies.filter(
                (item: Allergy) => item.id !== id
            );
        });

        builder.addCase(removeAllergy.rejected, (state: Draft<IallergiesState>, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default allergieslice.reducer;