const isAuth = () => {
    return sessionStorage.getItem('token') !== null;
};

export default isAuth;