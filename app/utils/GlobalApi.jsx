const { default: axios } = require("axios");
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`
});


const getCategory = () => axiosClient.get('/categories?populate=*');

const getSlider = () => axiosClient.get('/sliders?populate=*').then(resp => {
    return resp.data.data
})

const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => {
    return resp.data.data
})

const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp => {
    return resp.data.data
})

const getProductsByCategory = (category) => axiosClient.get('/products?filters[categories][name][$in]=' + category + '&populate=*').then(resp => {
    return resp.data.data
})

const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
})

const signInAccount = (email, password) => axiosClient.post('/auth/local', {
    identifier: email,
    password: password

})

const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
    headers: {
        Authorization: `Bearer ${jwt}`
    }
})

const getCartItem = (userId, jwt) => axiosClient.get('/user-carts?filters[userId][$eq]=' + userId + '&populate[products][populate]=image', userId, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
}).then(resp => {
    const data = resp.data.data;
    const cartItemList = data.map((item, index) => ({
        image:
            item.products?.[0]?.image?.[0]?.formats?.large?.url ||
            item.products?.[0]?.image?.[0]?.formats?.medium?.url || // added medium as a backup
            item.products?.[0]?.image?.[0]?.formats?.thumbnail?.url ||
            item.products?.[0]?.image?.[0]?.url ||
            null,

        name: item.products?.[0]?.name,
        id: item.id,
        amount: item.amount,
        actualPrice: item.products?.[0]?.mrp,
        quantity: item.quantity
    }));

    return cartItemList;
})
const deleteCartItem = (id, jwt) => axiosClient.delete('/user-carts/' + id, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
});




export default {
    getCategory,
    getSlider,
    getCategoryList,
    getAllProducts,
    getProductsByCategory,
    registerUser,
    signInAccount,
    addToCart,
    getCartItem,
    deleteCartItem


}