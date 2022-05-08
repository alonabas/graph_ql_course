module.exports.Query = {
    hello: () => 'hello world',
    products: (parent, {filter}, {db}) => {
        let resultProducts = db.products;
        if (filter?.onSale) {
            resultProducts = resultProducts.filter(el => el.onSale === filter?.onSale)
        }
        if (filter.avgRating) {
            resultProducts = resultProducts.filter(p => {
                const reviews = db.reviews.filter(e => e.productId === p.id);
                const avg = reviews.reduce((a, e) => a+e.rating, 0);
                return avg / reviews.length > filter.avgRating;
            });
        }
        return resultProducts.map(p => {
            const ratings = db.reviews.filter(r => r.productId === id);
            return {
                ...p, 
                avgRating: ratings.reduce((a, e) => a + e.rating, 0)/ratings.length
            };
        })
    },
    product: (parent, {id}, {db}) => {
        const result = db.products.find(p => p.id === id);
        const ratings = db.reviews.filter(e => e.productId === id);
        return {
            ...result, 
            avgRating:  ratings.length > 0 ? + (ratings.reduce((a, e) => a + e.rating, 0)/ratings.length).toFixed(2) : null
        };
    },
    categories: (parent, args, {db}) => 
        db.categories,
    category: (parent, {id}, {db}) => 
        db.categories.find(c => c.id === id)
}

