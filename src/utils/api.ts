const BASE_URL = 'https://norma.nomoreparties.space/api';
const HEADERS = new Headers()
HEADERS.set('Content-Type', 'application/json');
const HEADERS_WITH_AUTH = new Headers();
HEADERS_WITH_AUTH.append('Content-Type', 'application/json');
HEADERS_WITH_AUTH.append('authorization', localStorage.getItem('accessToken') || '')


// проверка ответа
const checkResponse = (res: Response): Promise<any> => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

//обертка всех запросов
const request = (url: string, options?: RequestInit) => {
    return fetch(`${BASE_URL}${url}`, options).then(checkResponse)
};

//обработка запроса с обновлением токена
const requesthWithRefresh = async (url: string, options?: RequestInit) => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, options);
        return await checkResponse(res);
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
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

//получить список ингредиентов
const getIngredients = () => {
    return request('/ingredients')
};

//отправить заказ
const postOrderRequest = (data: string[]) => {
    return requesthWithRefresh('/orders', {
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
const resetPasswordRequest = (data: {password: string, token: string}) => {
    return request('/password-reset/reset', {
        method: 'POST',
        body: JSON.stringify({
            password: data.password,
            token: data.token
        }),
        headers: HEADERS
    })
};

//зарегистрироваться
const registerRequest = (data: {email: string, password: string, name: string}) => {
    return request('/auth/register', {
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
const loginRequest = (data: {email: string, password: string}) => {
    return request('/auth/login', {
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
const refreshToken = () => {
    return request('/auth/token', {
        method: "POST",
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        }),
        headers: HEADERS
    })
};

//получить данные пользователя
const getUserRequest = () => {
    return requesthWithRefresh('/auth/user', {
        method: 'GET',
        headers: HEADERS_WITH_AUTH
    })
};

//изменить данные пользователя
const updateUserRequest = (data: {name: string, email: string, password: string}) => {
    return requesthWithRefresh('/auth/user', {
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
const getSelectedOrder = (data: string) => {
    return request(`/orders/${data}`)
};

export {
    forgotPasswordRequest, getIngredients, getSelectedOrder, getUserRequest, loginRequest,
    logoutRequest, postOrderRequest,
    registerRequest, resetPasswordRequest, updateUserRequest
};

