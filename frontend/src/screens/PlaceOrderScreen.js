import { getCartItems, getShipping } from '../localStorage.js'
import CheckoutSteps from '../components/CheckoutSteps.js'

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0) {
        document.location.hash = '/cart'
    }
    const shipping = getShipping();
    if(!shipping.address) {
        document.location.hash = '/shipping'
    }
    const payment = getPayment();
    if (!payment.paymentMethod) {
        document.location.hash = '/payment'
    }
    const itemsPrice = orderItems.reduce((a,c) => a + c.price + c.qty, 0)
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }
}

const PlaceOrderScreen = {
    after_render: () => {},
    render: () => {
        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        } = convertCartToOrder();

        return `
        <div>
            ${CheckoutSteps.render({
                step1: true, 
                step2: true, 
                step3: true, 
                step4: true,
            })}
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Shipping</h2>
                        <div>
                          ${shipping.address}, ${shipping.city}, ${shipping.postalCode},
                          ${shipping.country}, 
                        </div>
                    </div>
                    <div>
                        <h2>Payment</h2>
                        <div>
                            Payment Method: ${payment.paymentMethod}
                        </div>
                    </div>
                    <div>
                    <ul className="cart-list-container">
                        <li>
                            <h2>Shopping Cart</h2>
                            <div>Price</div>
                        </li>
                        ${
                            orderItems.map(item => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="${item.image}">
                                    </div>
                                    <div class="cart-item">
                                        <div><a href="/#/product/${item.product}">${item.name}</a></div>
                                    </div>
                                    <div>
                                        Qty: ${item.name}
                                    </div>
                                    <div class="cart-price">
                                        $${item.price}
                                    </div>
                                </li>
                            `)
                        }
                    </ul>
                    </div>
                </div>
                <div className="order-action">
                    Order Action
                </div>
            </div>
        </div>
        `
    }
}

export default PlaceOrderScreen;