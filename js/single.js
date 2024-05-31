const secondaryImages = document.querySelectorAll('.secondary-image > img');
const mainImage = document.querySelector('#main-image');

secondaryImages.forEach(img => {
    img.addEventListener('click', () => {
        mainImage.src = img.src;
    });
});

const addToCart = document.getElementById('add-to-cart');

addToCart.addEventListener('click', () => {
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

    const products = JSON.parse(localStorage.getItem('cart') ?? '[]');

    let exists = false;

    products.forEach(item => {
        if (item.id === 4) {
            item.quantity += 1;
            exists = true;
        }
    });

    if (!exists) {
        products.push({id: 4, quantity: 1, price: 100});
    }

    localStorage.setItem('cart', JSON.stringify(products));
});