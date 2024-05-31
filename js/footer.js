const links = document.querySelectorAll('.catalog-link');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        const id = parseInt(link.dataset.id);

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