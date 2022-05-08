const { gql } = require("apollo-server");

module.exports.scheme = gql`
    type Query {
        hello: String,
        products(filter: Filter): [Product!]!,
        product(id: ID!): Product,
        categories: [Category!]!,
        category(id: ID!): Category
    }
    type Product {
        id: ID,
        name: String,
        description: String,
        quantity: Int,
        price: Float,
        image: String,
        onSale: Boolean,
        category: Category,
        reviews: [Review!]!,
        avgRating: Float,
    }
    type Category {
        id: ID,
        name: String,
        products: [Product!]!
    }
    type Review {
        id: ID,
        date: String,
        title: String,
        comment: String,
        rating: Int,
        productId: ID
    }
    type Mutation {
        addCategory(input: CategoryInput!): Category!,
        addProduct(input: ProductInput!): Product!,
        addReview(input: ReviewInput!): Review!,
        deleteCategory(id: ID!): Boolean!,
        deleteProduct(id: ID!): Boolean!,
        deleteReview(id: ID!): Boolean!,
        updateCategory(id:ID!, input: CategoryInput!): Category,
        updateProduct(id:ID!, input: ProductInput!): Product,
        updateReview(id:ID!, input: ReviewInput!): Review,
    }
    input Filter {
        onSale: Boolean,
        avgRating: Int,
    }
    input CategoryInput {
        name: String!,
    }
    input ProductInput {
        name: String!,
        description: String!,
        quantity: Int!,
        price: Float!,
        image: String!,
        onSale: Boolean!,
        categoryId: ID,
    }
    input ReviewInput {
        date: String!,
        title: String!,
        comment: String!,
        rating: Int!,
        productId: ID!
    }
`;
