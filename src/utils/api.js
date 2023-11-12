const BASE_URL = 'https://norma.nomoreparties.space/api';
const HEADERS = { 'Content-Type': 'application/json' };
const HEADERS_WITH_AUTH = {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('accessToken')
};

// проверка ответа
const checkResponse = (res) => {
    if (res.ok) {
        return res.json()

    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

//обертка всех запросов
const request = (url, options) => {
    return fetch(`${BASE_URL}${url}`, options).then(checkResponse)
};

//обработка запроса с обновлением токена
const requesthWithRefresh = async (url, options) => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            HEADERS_WITH_AUTH.authorization = refreshData.accessToken;
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
const postOrderRequest = (data) => {
    return requesthWithRefresh('/orders', {
        method: 'POST',
        body: JSON.stringify({
            ingredients: data
        }),
        headers: HEADERS_WITH_AUTH
    })
};

//запрос для получения токена изменения пароля
const forgotPasswordRequest = (data) => {
    return request('/password-reset', {
        method: 'POST',
        body: JSON.stringify({
            email: data
        }),
        headers: HEADERS
    })
};

//запрос на изменение пароля
const resetPasswordRequest = (data) => {
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
const registerRequest = (data) => {
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
const loginRequest = (data) => {
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
const updateUserRequest = (data) => {
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

export {
    getIngredients,
    postOrderRequest,
    registerRequest,
    loginRequest,
    logoutRequest,
    forgotPasswordRequest,
    resetPasswordRequest,
    getUserRequest,
    updateUserRequest
}