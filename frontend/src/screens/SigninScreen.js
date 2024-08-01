import { signin } from "../api.js";

const SigninScreen = {
    after_render: () => {
        document.getElementById("signin-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = await signin({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });

            if(data.error) {
                alert(data.error);
            } else {
                document.location.hash = '/';
            }
        })
    },

    render: () => {
        return `
        <div class="form-container">
            <form action="" id="signin-form">
            <ul class="form-items">
                <li>
                    <h1>Sign-In</h1>
                </li>
                <li>
                    <label for="email">Email</label>
                    <input class="email-input" type="email" name="email" id="email" />
                </li>
                <li>
                    <label for="passord">Password</label>
                    <input class="password-input" type="password" name="password" id="password" />
                </li>
                <li>
                    <button type="submit" class="white" id="signin-button">Signin</button>
                </li>
                <li>
                    <div>
                        New User?
                        <a href="/#/register">Create your account</a>
                    </div>
                </li>
            </ul>
            </form>
        </div>
        `
    }

}

export default SigninScreen;