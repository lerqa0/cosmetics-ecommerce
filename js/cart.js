const table = document.getElementById('tbody');
const bagMainContent = document.querySelector('.bag-main-content');
const disclaimer = document.querySelector('.disclaimer');

const delivery = document.getElementById('delivery');
const total = document.getElementById('total');


const promocode = document.getElementById('promocode');
const applyPromoCode = document.getElementById('apple-promo-code');

let promocodeValue = 1;
let payMethod = 'cash-on-delivery';

applyPromoCode.addEventListener('click', () => {
    if (promocode.value === 'valeriaKrutaia') {
        promocodeValue = 0.8;
        applyPromoCode.disabled = true;
        applyPromoCode.style.cursor = 'not-allowed'
        calcTotal();
    }
});

const calcTotal = () => {
    let sum = 0;
    let deliverySum = 40;

    const cartProducts = getProducts();
    cartProducts.forEach(product => {
        sum += product.price * product.quantity;
    })

    sum *= promocodeValue;

    if (sum >= 500) {
        deliverySum = 0;
    }

    delivery.innerText = deliverySum + ' MDL'
    total.innerText = sum + ' MDL'
}

const getProducts = () => {
    if (null === localStorage.getItem('cart')) {
        return null;
    }

    return JSON.parse(localStorage.getItem('cart'));
}

const setProducts = (products) => {
    localStorage.setItem('cart', JSON.stringify(products));
    calcTotal();
}

const createBagItem = (item) => {
    const product = getProductById(item.id);

    const row = document.createElement("tr");

    const name = document.createElement("td");
    name.innerText = product.name;

    const price = document.createElement("td");
    price.innerText = product.price;

    const quantityContainer = document.createElement("td");

    const quantityChanger = document.createElement("div");
    quantityChanger.classList.add('product-quantity');

    const decrease = document.createElement('span');
    decrease.classList.add('decrease');
    decrease.innerText = '-';

    const increase = document.createElement('span');
    increase.classList.add('increase');
    increase.innerText = '+';

    const quantity = document.createElement('span');
    quantity.classList.add('quantity');
    quantity.innerText = item.quantity;

    quantityChanger.append(decrease, quantity, increase);
    quantityContainer.append(quantityChanger);

    row.append(name, price, quantityContainer);
    table.append(row);

    increase.addEventListener('click', () => {
        const value = parseFloat(quantity.innerText);
        quantity.innerText = value + 1;

        const products = getProducts();
        products.forEach(product => {
            if (item.id === product.id) {
                product.quantity = parseInt(quantity.innerText);
            }
        })

        setProducts(products)
    })

    decrease.addEventListener('click', () => {
        const value = parseFloat(quantity.innerText);
        quantity.innerText = value === 0 ? 0 : value - 1;

        const products = getProducts();
        products.forEach(product => {
            if (item.id === product.id) {
                product.quantity = parseInt(quantity.innerText);
            }
        })

        setProducts(products)
    })
}

const addProducts = (products) => {
    if (!products.length) {
        bagMainContent.style.display = 'none';
        disclaimer.style.display = 'block';
    }

    table.innerHTML = '';

    bagMainContent.style.display = 'block';
    disclaimer.style.display = 'none';

    products.forEach((item) => {
        createBagItem(item)
    });

    calcTotal();
}

const onlineBanking = document.getElementById('online-banking');
const cashOnDelivery = document.getElementById('cash-on-delivery');

cashOnDelivery.addEventListener('click', () => {
    cashOnDelivery.className = 'pink-button';
    onlineBanking.className = 'pink-button-outline';
    payMethod = 'cash-on-delivery';
})

onlineBanking.addEventListener('click', () => {
    onlineBanking.className = 'pink-button';
    cashOnDelivery.className = 'pink-button-outline';
    payMethod = 'online-banking';
});

document.addEventListener('DOMContentLoaded', () => {
    const products = getProducts();

    if (products !== null) {
        addProducts(products);
        bagMainContent.style.display = 'block';
        disclaimer.style.display = 'none';
    } else {
        bagMainContent.style.display = 'none';
        disclaimer.style.display = 'block';
    }
});
