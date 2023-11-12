import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    registerRequest,
    loginRequest,
    logoutRequest,
    getUserRequest,
    updateUserRequest
} from "../utils/api";

export const register = createAsyncThunk(
    'user/register',
    async (data) => {
        const res = await registerRequest(data);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
    });

export const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const res = await loginRequest(data)
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res;
    });

export const logout = createAsyncThunk(
    'user/logout',
    async (data) => {
        const res = await logoutRequest(data)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return res;
    });

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data) => {
        const res = await updateUserRequest(data);
        return res;
    });

export const getUser = () => {
    return (dispatch) => {
        return getUserRequest()
            .then(res => dispatch(setUser(res.user)))
    }
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthChecked: false,
        loading: false,
        error: null
    },
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;