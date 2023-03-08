async function login(username, password) {
    return new Promise((resolve, reject) => {
        if (username.toLowerCase() == 'peter' && password == '123456') {
            resolve({
                _id: '123f',
                username: 'Peter',
                roles: ['user'],
            });
        } else {
            reject(new Error('Incorrect username or password'));
        }
    });
}

module.exports = {
    login,
};
