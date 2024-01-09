import { Action, PayloadAction, ThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../types/types";
import {
    TResetPassData,
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    resetPasswordRequest,
    updateUserRequest
} from "../utils/api";
import { RootState } from "./store";

type TUserSlice = {
    user: TUser | null;
    isAuthChecked: boolean;
    loading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: TUserSlice = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null,
    message: null,
}

export const register = createAsyncThunk(
    'user/register',
    async (data: TUser) => {
        const res = await registerRequest(data);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
    });

export const login = createAsyncThunk(
    'user/login',
    async (data: Pick<TUser, 'email' | 'password'>) => {
        const res = await loginRequest(data)
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res;
    });

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        const res = await logoutRequest()
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return res;
    });

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data: TUser) => {
        const res = await updateUserRequest(data);
        return res;
    });

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ password, token }: TResetPassData) => {
        const res = await resetPasswordRequest({ password, token });
        return res;
    });

export const getUser = (): ThunkAction<Promise<unknown>, RootState, unknown, Action> => {
    return (dispatch) => {
        return getUserRequest()
            .then(res => dispatch(setUser(res.user)))
    }
};

export const checkUserAuth = (): ThunkAction<void, RootState, unknown, Action> => {
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
    initialState,
    reducers: {
        setAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action: PayloadAction<TUser | null>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<string>) => {
                    state.loading = true;
                    state.error = action.payload;
                })

    }
});

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;