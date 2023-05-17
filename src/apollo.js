import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: `https://inner-worlds-graphql-api.onrender.com/graphql`,
  cache: new InMemoryCache(),
});

export default client;
