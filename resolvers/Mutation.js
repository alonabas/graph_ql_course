const { v4: uuid} = require('uuid');
exports.Mutation = {
    addCategory: (parent, {input}, {db}) => {
        const {name} = input;
        const newCategory ={
            name,
            id: uuid()
        }
       db.categories.push(newCategory);
        return newCategory;
    },
    addProduct: (parent, {input}, {db}) => {
        const {
            name,
            description,
            quantity,
            price,
            image,
            onSale,
            categoryId
        } = input;
        const newProduct = {
            name,
            description,
            quantity,
            price,
            image,
            onSale,
            categoryId,
            id: uuid()
        }
        db.products.push(newProduct);
        return newProduct;
    },
    addReview: (parent, {input}, {db}) => {
        const {
            date,
            title,
            comment,
            rating,
            productId
        } = input;
        const newReview = {
            date,
            title,
            comment,
            rating,
            productId,
            id: uuid()
        }
        db.reviews.push(newReview);
        return newReview;
    },
    deleteCategory: (parent, {id}, {db}) => {
        db.categories = db.categories.filter(e => e?.id !== id);
        return true;
    },
    deleteProduct: (parent, {id}, {db}) => {
        db.products = db.products.filter(e => e?.id !== id);
        db.reviews = db.reviews.filter(e => e.productId !== id)
        return true;
    },
    deleteReview: (parent, {id}, {db}) => {
        db.reviews = db.reviews.filter(e => e.id !== id)
        return true;
    },
    updateCategory: (parent, {id, input}, {db}) => {
        const index = db.categories.find(e => e.id === id);
        if (index === -1) return null;
        db.categories[index] = {
            ...db.categories[index],
            ...input,
        }
        return db.categories[index];
    },
    updateProduct: (parent, {id, input}, {db}) => {
        const index = db.products.find(e => e.id === id);
        if (index === -1) return null;
        db.products[index] = {
            ...db.products[index],
            ...input,
        }
        return db.products[index];
    },
    updateReview: (parent, {id, input}, {db}) => {
        const index = db.reviews.find(e => e.id === id);
        if (index === -1) return null;
        db.reviews[index] = {
            ...db.reviews[index],
            ...input,
        }
        return db.reviews[index];
    },
}