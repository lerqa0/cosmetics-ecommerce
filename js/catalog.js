const cardsContainer = document.querySelector('.catalog');

const setCriteria = (criteria) => {
    localStorage.setItem('criteria', JSON.stringify(criteria));
}

const getCriteria = () => {
    if (localStorage.getItem('criteria') === null) {
        return null;
    }

    return JSON.parse(localStorage.getItem('criteria'));
}

let criteria = getCriteria();

if (criteria === null) {
    criteria = {
        brands: [],
        fromPrice: 0,
        name: null,
        toPrice: null,
        sort: 'default',
        categoryLevel1: [],
        categoryLevel2: [],
        categoryLevel3: []
    }

    setCriteria(criteria);
}

const showMessage = () => {
    Toastify({
        text: "Adăugat cu succes",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#FF99AB",
            "margin-top": "70px"
        },
    }).showToast();
}

const createCard = (product) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const imgProduct = document.createElement('div');
    imgProduct.classList.add('img-product');

    const img = document.createElement('img');
    img.src = `./products/${product.id}.png`;
    img.alt = product.name;

    const heartSvg = '<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '                            <path d="M10.9156 18.7342L10.9141 18.733C7.80374 16.0432 5.30481 13.8768 3.57178 11.8548C1.84802 9.84361 1 8.10693 1 6.29428C1 3.35565 3.40984 1 6.6 1C8.4029 1 10.1373 1.80545 11.2567 3.04933L12 3.87527L12.7433 3.04933C13.8627 1.80545 15.5971 1 17.4 1C20.5902 1 23 3.35565 23 6.29428C23 8.10693 22.152 9.84361 20.4282 11.8548C18.6952 13.8768 16.1963 16.0432 13.0859 18.733L13.0844 18.7342L12 19.6757L10.9156 18.7342Z"\n' + '                                  stroke="black" stroke-width="2"/>\n' + '                            <path class="heart-container" fill="#C2061B"\n' + '                                  d="M10.9156 18.7342L10.9141 18.733C7.80374 16.0432 5.30481 13.8768 3.57178 11.8548C1.84802 9.84361 1 8.10693 1 6.29428C1 3.35565 3.40984 1 6.6 1C8.4029 1 10.1373 1.80545 11.2567 3.04933L12 3.87527L12.7433 3.04933C13.8627 1.80545 15.5971 1 17.4 1C20.5902 1 23 3.35565 23 6.29428C23 8.10693 22.152 9.84361 20.4282 11.8548C18.6952 13.8768 16.1963 16.0432 13.0859 18.733L13.0844 18.7342L12 19.6757L10.9156 18.7342Z"\n' + '                                  stroke="#C2061B" stroke-width="2"/>\n' + '                        </svg>';

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = heartSvg;

    const cart = document.createElement('div')
    cart.classList.add('cart');

    const cartImg = document.createElement('img');
    cartImg.src = './sources/mobile-cart.png';
    cartImg.alt = 'cart';

    cart.append(cartImg);

    imgProduct.appendChild(heart);
    imgProduct.appendChild(img);
    cardImage.appendChild(imgProduct)
    cardImage.appendChild(cart)
    card.appendChild(cardImage);

    const cardBody = document.createElement('a');
    cardBody.href = `./single.html?product=${product.id}`;
    cardBody.classList.add('card-body');

    const cardTitleContainer = document.createElement('div');
    cardTitleContainer.classList.add('card-title-container');

    const productCapacity = document.createElement('span');
    productCapacity.classList.add('card-title-element');
    productCapacity.innerText = product.capacity + 'ml';

    const productPrice = document.createElement('span');
    productPrice.classList.add('card-title-element');
    productPrice.innerText = product.price + 'mdl';

    cardTitleContainer.append(productCapacity, productPrice);
    cardBody.appendChild(cardTitleContainer)

    const cardProductTitle = document.createElement('span');
    cardProductTitle.classList.add('card-product-title');
    cardProductTitle.innerText = product.name;

    const cardProductBrand = document.createElement('span');
    cardProductBrand.classList.add('card-product-brand');
    cardProductBrand.innerText = product.brand;

    cardBody.append(cardProductTitle, cardProductBrand);

    card.appendChild(cardBody);

    cardsContainer.appendChild(card);

    cart.addEventListener('click', () => {
        showMessage();

        const products = JSON.parse(localStorage.getItem('cart') ?? '[]');

        let exists = false;

        products.forEach(item => {
            if (item.id === product.id) {
                item.quantity += 1;
                exists = true;
            }
        });

        if (!exists) {
            products.push({id: product.id, quantity: 1, price: product.price});
        }

        localStorage.setItem('cart', JSON.stringify(products));
    })
}

const addProducts = (products) => {
    cardsContainer.innerHTML = '';

    products.forEach(product => {
        createCard(product);
    })
}

const filter = () => {
    const criteria = getCriteria()

    let filteredProducts = [];

    filteredProducts = products;

    if (criteria.categoryLevel1.length || criteria.categoryLevel2.length || criteria.categoryLevel3.length) {
        filteredProducts = filteredProducts.filter(item => {
            if (!criteria.categoryLevel2.length && !criteria.categoryLevel3.length) {
                if (criteria.categoryLevel1.includes(item.categoryLevel1)) {
                    return true;
                }
            }

            if (criteria.categoryLevel2.includes(item.categoryLevel2)) {
                return true;
            }

            if (criteria.categoryLevel3.includes(item.categoryLevel3)) {
                return true;
            }

            return false
        })
    }

    // name filter
    if (criteria.name !== null) {
        filteredProducts = filteredProducts.filter(item => item.name.toLowerCase().includes(criteria.name.toLowerCase()));
    }

    // brands filter
    if (criteria.brands?.length) {
        filteredProducts = filteredProducts.filter(item => criteria.brands.includes(item.brand.toLowerCase()))
    }

    // min price filter
    if (criteria.fromPrice !== null) {
        filteredProducts = filteredProducts.filter(item => item.price >= criteria.fromPrice);
    }

    // max price filter
    if (criteria.toPrice !== null) {
        filteredProducts = filteredProducts.filter(item => item.price <= criteria.toPrice);
    }

    // sort asc
    if (criteria.sort === 'asc') {
        filteredProducts.sort((a, b) => {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
            return 0;
        });
    }

    // sort desc
    if (criteria.sort === 'desc') {
        filteredProducts.sort((a, b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
        });
    }

    addProducts(filteredProducts);
}

// BRANDS \\
const brands = document.querySelectorAll('.brand-input');
brands.forEach(brand => {
    const brandName = brand.value.toLowerCase()
    const criteria = getCriteria();

    if (criteria.brands?.includes(brandName)) {
        brand.checked = true;
    }

    brand.addEventListener('click', (e) => {
        const criteria = getCriteria();

        if (criteria.brands.includes(brandName)) {
            criteria.brands = criteria.brands.filter(item => item !== brandName)
        } else {
            criteria.brands.push(brandName);
        }

        setCriteria(criteria);

        filter();
    });
});
// END BRANDS \\

// PRICES \\
const fromPrice = document.getElementById('from-price');
const toPrice = document.getElementById('to-price');

fromPrice.value = criteria.fromPrice;
toPrice.value = criteria.toPrice;

fromPrice.addEventListener('input', () => {
    const criteria = getCriteria();
    criteria.fromPrice = parseFloat(fromPrice.value);
    setCriteria(criteria);
    filter()
});

toPrice.addEventListener('input', () => {
    const criteria = getCriteria();
    criteria.toPrice = parseFloat(toPrice.value);
    setCriteria(criteria)
    filter()
});
// END PRICES \\

// ACCORDION \\
const accordionItems = document.querySelectorAll('.acor-item');
accordionItems.forEach(accordionItem => {
    const criteria = getCriteria();

    const input = accordionItem.querySelector('input');
    const id = parseInt(input.dataset.id);

    if (criteria.categoryLevel1?.includes(id)) {
        input.checked = true;
    }

    input.addEventListener('click', () => {
        const criteria = getCriteria();

        if (criteria.categoryLevel1?.includes(id)) {
            criteria.categoryLevel1 = criteria.categoryLevel1.filter(item => item !== id)
        } else {
            criteria.categoryLevel1.push(id);
        }

        setCriteria(criteria);
        filter();
    });

    const categoriesLevel2 = accordionItem.querySelectorAll('.category-level-2');
    categoriesLevel2.forEach(categoryLevel2 => {
        const criteria = getCriteria();
        const input = categoryLevel2.querySelector('label > input');
        const id = parseInt(input.value);

        if (criteria.categoryLevel2?.includes(id)) {
            input.checked = true;
        }

        input.addEventListener('click', () => {
            const criteria = getCriteria();

            if (criteria.categoryLevel2?.includes(id)) {
                criteria.categoryLevel2 = criteria.categoryLevel2.filter(item => item !== id)
            } else {
                criteria.categoryLevel2.push(id);
            }

            const categoriesLevel3 = categoryLevel2.querySelectorAll('.category-level-3 > .list-item > label > input');

            categoriesLevel3.forEach(inputLevel3 => {
                inputLevel3.checked = input.checked;

                const id = parseInt(inputLevel3.value)

                if (criteria.categoryLevel3?.includes(id)) {
                    criteria.categoryLevel3 = criteria.categoryLevel3.filter(item => item !== id)
                } else {
                    criteria.categoryLevel3.push(id);
                }

            })

            setCriteria(criteria);
            filter();
        });

        const categoriesLevel3 = accordionItem.querySelectorAll('.category-level-3 > .list-item > label > input');
        categoriesLevel3.forEach(categoryLevel3 => {
            const criteria = getCriteria();
            const id = parseInt(categoryLevel3.value);

            if (criteria.categoryLevel3?.includes(id)) {
                categoryLevel3.checked = true;
            }

            categoryLevel3.addEventListener('click', () => {
                const criteria = getCriteria();

                if (criteria.categoryLevel3?.includes(id)) {
                    criteria.categoryLevel3 = criteria.categoryLevel3.filter(item => item !== id)
                } else {
                    criteria.categoryLevel3.push(id);
                }

                setCriteria(criteria);
                filter();
            });
        });
    });
});
// END ACCORDION \\

// SORT \\
const defaultSort = document.getElementById('default-sort');
const ascSort = document.getElementById('asc-sort');
const descSort = document.getElementById('desc-sort');

if (criteria.sort === 'default') {
    defaultSort.checked = true;
}

if (criteria.sort === 'asc') {
    ascSort.checked = true;
}

if (criteria.sort === 'desc') {
    descSort.checked = true;
}

defaultSort.addEventListener('click', () => {
    const criteria = getCriteria();
    if (defaultSort.checked) {
        criteria.sort = 'default';
        setCriteria(criteria);

        filter();
    }
})

ascSort.addEventListener('click', () => {
    const criteria = getCriteria();
    if (ascSort.checked) {
        criteria.sort = 'asc';
        setCriteria(criteria);

        filter();
    }
})

descSort.addEventListener('click', () => {
    const criteria = getCriteria();
    if (descSort.checked) {
        criteria.sort = 'desc';
        setCriteria(criteria);

        filter();
    }
})
// END SORT \\

// NAME \\
const search = document.getElementById('search-product');
search.addEventListener('input', () => {
    const criteria = getCriteria();
    criteria.name = search.value;
    setCriteria(criteria);

    filter();
});
// END NAME \\

document.addEventListener('DOMContentLoaded', () => {
    filter();
});
