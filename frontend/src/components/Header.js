import { getUserInfo } from "../localStorage.js";

const Header = {
    render: () => {
        const {name} = getUserInfo();

        return `
        <section id="header">
            <a href="/"><img src="img/icon.png" class="logo" alt=""></a>
            <div>
                <ul id="navbar">
                <li><a class="active" href="/">Home</a></li>
                <!-- <li><a href="shop.html">shop</a></li> -->
                <li>
                    ${
                        name
                        ? `<a href="/#/profile">${name}</a>`
                        : `<a href="/#/signin">Sign In</a>`
                    }
                </li>
                <!-- <li><a href="#">About</a></li> -->
                <!-- <li><a href="#">Contact</a></li> -->
                <li><a id="lg-bag" href="/#/cart"><i class="fa-solid fa-shopping-bag"></i></a></li>
                <a href="#" id="close"><i class="fas fa-times"></i></a>
                </ul>
            </div>
            <div id="mobile">
                <a href="/#/cart"><i class="fa-solid fa-shopping-bag"></i></a>
                <i id="bar" class="fa-solid fa-bars"></i>
            </div>
        </section>
        `
    },
    after_render: () => {},
};

export default Header;