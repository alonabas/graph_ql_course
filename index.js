const { ApolloServer } = require("apollo-server");
const { Category } = require('./resolvers/Category');
const { Product } = require('./resolvers/Product');
const { Query } = require('./resolvers/Query');
const { Mutation } = require('./resolvers/Mutation');

const { scheme } = require('./scheme');
const { 
    categories,
    products,
    reviews
} = require('./db');

const resolvers = {
    Query,
    Category,
    Product,
    Mutation
}

const server = new ApolloServer({
    typeDefs :scheme, 
    resolvers,
    context: {
        db: {
            categories,
            products,
            reviews
        }
    }
});
// scheme - type definitions - how data looks like. 
// fruits: [string]
// 
// resolvers - functions return data specified in scheme. 
// fruits: () => ['banana', 'apple']


server.listen().then(({url}) => {
    console.log(`Server is ready at ${url}`)
});