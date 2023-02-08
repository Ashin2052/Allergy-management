import {createAsyncThunk, createSlice, Draft, PayloadAction,} from '@reduxjs/toolkit';
import {ApiErrorResponse,} from '../../types/shared.types';

import {create, edit, fetchAll, remove,} from '../../services/allergy.service';
import {IAllergy} from '../../types/allergy.types';

interface IallergiesState {
    data: any;
    loading: boolean;
    isAdding: boolean;
    isEditing: boolean;
    error: ApiErrorResponse;
}

const initialState: IallergiesState = {
    data: {
        allergies: [],
        currentPage: 1,
        totalPages: 1,
    },
    loading: false,
    isAdding: false,
    isEditing: false,
    error: {
        data: {
            info: '',
        },
        message: '',
        status: 500,
    },
};

export const fetchAllergies = createAsyncThunk(
    'allergy/fetchAllAllergies',
    async (_, {rejectWithValue}) => {
        try {
            return await fetchAll();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const createAllergy = createAsyncThunk(
    'allergy/createAllergy',
    async (payload: FormData, {rejectWithValue}) => {
        try {
            return await create(payload);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const editAllergy = createAsyncThunk(
    'allergy/editAllergy',
    async (data: any, {rejectWithValue}) => {
        try {
            return await edit(data.formData, data.id);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const removeAllergy = createAsyncThunk(
    'allergy/removeAllergy',
    async (id: string, {rejectWithValue}) => {
        try {
            return await remove(id);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const allergieslice = createSlice({
    name: 'allergy',
    initialState,

    reducers: {
        addAllergy: (state: Draft<IallergiesState>, action) => {
            state.data.allergies.push(action.payload.data);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllergies.pending, (state: Draft<IallergiesState>) => {
            state.loading = true;
        });

        builder.addCase(
            fetchAllergies.fulfilled, (state: Draft<IallergiesState>, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            }
        );


        builder.addCase(
            fetchAllergies.rejected,
            (state: Draft<IallergiesState>, action: PayloadAction<any>) => {
                state.loading = false;
                state.data.allergies = [];

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
            state.data.allergies = [...state.data.allergies, action.payload.data];
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
            const data = action.payload;
            state.data.allergies = state.data.allergies.map((item: IAllergy) => {
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

            const {id} = action.payload;


            state.data.allergies = state.data.allergies.filter(
                (item: IAllergy) => item.id !== id
            );
        });

        builder.addCase(removeAllergy.rejected, (state: Draft<IallergiesState>, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default allergieslice.reducer;