//Mobile view navbar script
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
} 

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
} 

//update the current page to the single product page
document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll('.pro');
    if(products.length > 0) {
        products.forEach(product => {
            product.addEventListener('click', () => {
                const productId = product.getAttribute('data-id');
                if (productId) {
                    window.location.href = `sproduct.html?id=${productId}`;
                } else {
                    console.log('product ID not found');
                }
            })
        })
    }
})