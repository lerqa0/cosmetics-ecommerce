const categories = document.querySelectorAll('.category-item');

categories.forEach(category => {
    category.addEventListener('click', (e) => {
        const id = parseInt(category.dataset.id);

        criteria = {
            brands: [],
            fromPrice: 0,
            name: null,
            toPrice: null,
            sort: 'default',
            categoryLevel1: [id],
            categoryLevel2: [],
            categoryLevel3: []
        }

        localStorage.setItem('criteria', JSON.stringify(criteria));

        window.location.href = './catalog.html';
    })
})