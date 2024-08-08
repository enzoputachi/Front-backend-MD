import { getUserInfo } from "../localStorage.js";
import { getCurrentScreen, parseRequestUrl } from "../utils.js";

const Header = {
    render: () => {
        const {name} = getUserInfo();
        const { resource } = parseRequestUrl();
        const currentScreen = getCurrentScreen();

        //update the active based on screen
        let isActive = (screen) => parseUrl === screen ? 'active' : '';
        const request = parseRequestUrl();
        const parseUrl = 
          (request.resource ? `/${request.resource}` : '/') +
          (request.id ? '/:id' : '') +
          (request.action ? `${request.action}` : '')
          console.log('parsed url:', parseUrl);
    
        if (typeof resource === undefined ) {
            isActive = 'active';

        }

        //List of screens where the header should no be displayed
        const hiddenHeaderOnScreen = ['signin', 'register', ]

        if (hiddenHeaderOnScreen.includes(currentScreen)) {
            return '';
        }

        return `
        <section id="header">
            <a href="/"><img src="img/icon.png" class="logo" alt=""></a>
            <div>
                <ul id="navbar">
                <li><a class="${isActive('/')}" href="/">Home</a></li>
                <li><a class="${isActive('shop')}"href="shop.html">shop</a></li>
                <li>
                    ${
                        name
                        ? `<a class="${isActive('/profile')}" href="/#/profile">${name}</a>`
                        : `<a class="${isActive('/signin')}" href="/#/signin">Sign In</a>`
                    }
                </li>
                <li><a class="${isActive('/about')}" href="#">About</a></li>
                <li><a class="${isActive('/contact')}" href="#">Contact</a></li>
                <li><a class="${isActive('/cart')}" id="lg-bag" href="/#/cart"><i class="fa-solid fa-shopping-bag"></i></a></li>
                <a href="#" id="close"><i class="fas fa-times"></i></a>
                </ul>
            </div>
            <div id="mobile">
                <a class="${isActive('/cart')}" href="/#/cart"><i class="fa-solid fa-shopping-bag"></i></a>
                <i id="bar" class="fa-solid fa-bars"></i>
            </div>
        </section>
        `
    },
    
    after_render: () => {
        const bar = document.getElementById('bar');
        const nav = document.getElementById('navbar');
        const close = document.getElementById('close');

        if (bar) {
            bar.addEventListener('click', () => {
            nav.classList.add('active');
        })} 

        if (close) {
            close.addEventListener('click', () => {
            nav.classList.remove('active')
        })}  
    },
};

export default Header;