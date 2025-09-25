export const getProducts = (filter = {}) => {
    const products = JSON.parse(localStorage.getItem('unilagYardProducts') || '[]');
    
    if (filter.featured) {
        return products.filter(p => p.featured);
    }
    
    if (filter.category) {
        return products.filter(p => p.category === filter.category);
    }
    
    return products;
};

export const saveProduct = (productData) => {
    const products = JSON.parse(localStorage.getItem('unilagYardProducts') || '[]');
    products.push({
        id: Date.now(),
        ...productData,
        featured: productData.featured || false,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('unilagYardProducts', JSON.stringify(products));
};