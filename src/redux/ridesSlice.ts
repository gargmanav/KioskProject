import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRides } from '../api/apiService';

export const loadRides = createAsyncThunk('rides/loadRides', async () => {
    console.log("called hua rides")
  return await fetchRides();
});

const ridesSlice = createSlice({
  name: 'rides',
  initialState: {
    rides: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadRides.fulfilled, (state, action) => {
      state.rides = action.payload;
      state.status = 'succeeded';
    });
  },
});

export default ridesSlice.reducer;
