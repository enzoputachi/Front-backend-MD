const SigninScreen = {
    after_render: () => {},
    render: () => {
        return `
        <div class="form-container">
            <form action="" id="signin-form">
                <li>
                    <h1>Sign-In</h1>
                </li>
                <li>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" />
                </li>
                <li>
                    <label for="passord">Password</label>
                    <input type="password" name="password" id="password" />
                </li>
                <li>
                    <button type="submit" id="normal">Signin</button>
                </li>
                <li>
                    <div>
                        New User?
                        <a href="/#/register">Create your account</a>
                    </div>
                </li>
            </form>
        </div>
        `
    }

}

export default SigninScreen;