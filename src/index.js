import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

console.log( `Hello, World.` );
console.log( process.env.MY_SECRET );

const app = express();
app.use( cors() );

const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
  }
`;

const resolvers = {
  Query: {
    users: () => Object.values( users ),
    user: ( parent, { id } ) => users[ id ],
    me: () => me,
  },
  User: {
    username: ( { username } ) => username,
  },
};

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

const me = users[ 1 ];

const server = new ApolloServer( {
	typeDefs, resolvers,
} );

server.applyMiddleware( { app, path : `/graphql` } );

app.listen( { port : 8000 }, () => {
	console.log( `Apollo Server on http://localhost:8000/graphql` );
} );
console.log( process.env.MY_SECRET );