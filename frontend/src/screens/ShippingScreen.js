import CheckoutSteps from "../components/CheckoutSteps.js";
import { getUserInfo, getShipping, setShipping } from "../localStorage.js";

const ShippingScreen = {
    after_render: () => {

        document.getElementById("shipping-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            setShipping({
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
            })

            document.location.hash = '/payment'
        });
    },

    render: () => {
        //ensure user is signed in
        const { name } = getUserInfo();
        if(!name) {
            document.location.hash = '/';
        }

        const {address, city, postalCode, country} = getShipping();

        return `
        ${CheckoutSteps.render({ step1: true, step2: true })}
        <div class="form-container">
            <form id="shipping-form">
            <ul class="form-items">
                <li>
                    <h1>Shipping</h1>
                </li>
                <li>
                    <label for="address">Address</label>
                    <input class="email-input" type="text" name="address" id="address" value=${address}>
                </li>
                <li>
                    <label for="city">City</label>
                    <input class="email-input" type="text" name="city" id="city" value=${city}>
                </li>
                <li>
                    <label for="name">Postal Code</label>
                    <input class="email-input" type="text" name="postalcode" id="postalCode" value=${postalCode}>
                </li>
                <li>
                    <label for="name">Country</label>
                    <input class="email-input" type="text" name="country" id="country" value=${postalCode}>
                </li>
                <li>
                    <button type="submit" class="normal" id="shipping-button">Continue</button>
                </li>            
            </ul>
            </form>
        </div>
        `
    }

}

export default ShippingScreen;