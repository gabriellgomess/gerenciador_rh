const isAuth = () => {
    return localStorage.getItem('token') !== null;
};

export default isAuth;