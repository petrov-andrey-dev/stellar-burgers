const BASE_URL = 'https://norma.nomoreparties.space/api';
const HEADERS = { 'Content-Type': 'application/json' };

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

const request = (url, options) => {
    return fetch(`${BASE_URL}${url}`, options).then(checkResponse)
};

const getIngredients = () => {
    return request('/ingredients')
};

const postOrder = (data) => {
    return request('/orders', {
        method: 'POST',
        body: JSON.stringify({
            ingredients: data
        }),
        headers: HEADERS
    })
};

export { getIngredients, postOrder }