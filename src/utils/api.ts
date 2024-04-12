import { TIngredient, TOrder, TOrderData, TUser } from "../types/types";

const BASE_URL = 'https://norma.nomoreparties.space/api';
export const HEADERS = new Headers()

export const HEADERS_WITH_AUTH = new Headers();
export const setHeaders = () => {
    HEADERS.set('Content-Type', 'application/json');
    HEADERS_WITH_AUTH.set('Content-Type', 'application/json');
    HEADERS_WITH_AUTH.set('authorization', localStorage.getItem('accessToken') || '');
}

// проверка ответа
const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

//обертка всех запросов
const request = <T>(url: string, options?: RequestInit) => {
    return fetch(`${BASE_URL}${url}`, options).then(checkResponse<T>)
};

//обработка запроса с обновлением токена
const requesthWithRefresh = async <T>(url: string, options?: RequestInit) => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, options);
        return await checkResponse<T>(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            HEADERS_WITH_AUTH.set('authorization', refreshData.accessToken);
            const res = await fetch(`${BASE_URL}${url}`, options);
            return await checkResponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
};

//получить список ингредиентов
type TGetIngredients = {
    success: boolean;
    data: TIngredient[];
}

const getIngredients = () => {
    return request<TGetIngredients>('/ingredients')
};

//отправить заказ
const postOrderRequest = (data: string[]) => {
    return requesthWithRefresh<TOrderData>('/orders', {
        method: 'POST',
        body: JSON.stringify({
            ingredients: data
        }),
        headers: HEADERS_WITH_AUTH
    })
};

//запрос для получения токена изменения пароля
const forgotPasswordRequest = (data: string) => {
    return request('/password-reset', {
        method: 'POST',
        body: JSON.stringify({
            email: data
        }),
        headers: HEADERS
    })
};

//запрос на изменение пароля
export type TResetPassData = {
    password: string;
    token: string;
}

type TResetPasswordRequest = {
    message: string;
    success: boolean;
}

const resetPasswordRequest = ({password, token}: TResetPassData) => {
    return request<TResetPasswordRequest>('/password-reset/reset', {
        method: 'POST',
        body: JSON.stringify({
            password: password,
            token: token
        }),
        headers: HEADERS
    })
};

//зарегистрироваться
type TRegisterRequest = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
}

const registerRequest = (data: {email: string, password: string, name: string}) => {
    return request<TRegisterRequest>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name
        }),
        headers: HEADERS
    })
};

//залогиниться
type TLoginRequest = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
}

const loginRequest = (data: {email: string, password: string}) => {
    return request<TLoginRequest>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
        headers: HEADERS
    })
};

//разлогиниться
const logoutRequest = () => {
    return request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        }),
        headers: HEADERS
    })
};

//запрос на обновление токена
type TRafreshToken = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

const refreshToken = () => {
    return request<TRafreshToken>('/auth/token', {
        method: "POST",
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        }),
        headers: HEADERS
    })
};

//получить данные пользователя
type TGetUserRequest = {
    success: boolean;
    user: TUser;
}

const getUserRequest = () => {
    return requesthWithRefresh<TGetUserRequest>('/auth/user', {
        method: 'GET',
        headers: HEADERS_WITH_AUTH
    })
};

//изменить данные пользователя
type TUpdateUserRequest = {
    success: boolean;
    user: TUser;
}

const updateUserRequest = (data: {name: string, email: string, password: string}) => {
    return requesthWithRefresh<TUpdateUserRequest>('/auth/user', {
        method: 'PATCH',
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password
        }),
        headers: HEADERS_WITH_AUTH
    })
};
//запрос выбранного заказа
type TGetSelectedOrder = {
    success: boolean;
    orders: TOrder[];
}

const getSelectedOrder = (data: string) => {
    return request<TGetSelectedOrder>(`/orders/${data}`)
};

export {
    forgotPasswordRequest, getIngredients, getSelectedOrder, getUserRequest, loginRequest,
    logoutRequest, postOrderRequest,
    registerRequest, resetPasswordRequest, updateUserRequest
};

