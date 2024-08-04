import { update } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const ProfileScreen = {
    after_render: () => {
        document.getElementById("profile-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            showLoading()
            const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();

            if(data.error) {
                showMessage(data.error); 
            } else {
                //save user info in the local storage
                setUserInfo(data);
                document.location.hash = '/';
            }
        })
    },

    render: () => {
        const {name, email} = getUserInfo();

        if(!name) {
            document.location.hash = '/';
        }

        return `
        <div class="form-container">
            <form action="" id="profile-form">
            <ul class="form-items">
                <li>
                    <h1>User profile</h1>
                </li>
                <li>
                    <label for="name">Name</label>
                    <input class="email-input" type="name" name="name" id="name" value=${name}/>
                </li>
                <li>
                    <label for="email">Email</label>
                    <input class="email-input" type="email" name="email" id="email" value=${email}/>
                </li>
                <li>
                    <label for="passord">Password</label>
                    <input class="password-input" type="password" name="password" id="password" />
                </li>
                <li>
                    <button type="submit" class="normal" id="register-button">Update</button>
                </li>
                <li>
                    <div>
                        Already have an account?
                        <a href="/#/signin">Sign-In</a>
                    </div>
                </li>
            </ul>
            </form>
        </div>
        `
    }

}

export default ProfileScreen;