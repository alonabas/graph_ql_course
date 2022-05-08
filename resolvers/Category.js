module.exports.Category = {
    products: ({id}, {filter}, {db}) => {
        let tempProducts = db.products.filter(e => e.categoryId == id);
        if (filter?.onSale) {
            tempProducts = tempProducts.filter(el => el.onSale === filter?.onSale)
        }
        if (filter?.avgRating) {
            tempProducts = tempProducts.filter(p => {
                const reviews = db.reviews.filter(e => e.productId === p.id);
                
                const avg = reviews.reduce((a, e) => a+e.rating, 0);
                return avg / reviews.length > filter.avgRating;
            });
        }
        return tempProducts.map(p => {
            const ratings = db.reviews.filter(r => r.productId === p.id);
            console.log(ratings)
            return {
                ...p, 
                avgRating: ratings.length > 0 ? +(ratings.reduce((a, e) => a + e.rating, 0)/ratings.length).toFixed(2) : null
            };
        });
    }
}

