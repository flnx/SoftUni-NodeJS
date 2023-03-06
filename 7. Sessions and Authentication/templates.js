const loginPage = `
    <form method="POST">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" />

        <label for="password">Password</label>
        <input type="password" name="password" id="password" />

        <input type="submit" value="Login" />
    </form>
`;

const homePage = `
    <h1>Hello</h1>
    <p><a href="/profile">Profile</a></p> 
    <p><a href="/login">Login</a></p>
`

module.exports = {
    loginPage,
    homePage
}