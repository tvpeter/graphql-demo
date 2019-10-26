const graphql = require('graphql');
const _ = require('lodash'); 

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,
GraphQLInt } = graphql;

const data = [
{name: 'First published book', genre: 'fiction', id: '1'},
{ name: 'My second published book', genre: 'storytelling', id: '2' },
{ name: 'My third published book', genre: 'short story', id: '3' },
{ name: 'My fourth published book', genre: 'fiction', id: '4' },
];

const authors = [
  { name: 'Tyonum Peter', age: 88, id: '1' },
  { name: 'John Mashal', age: 28, id: '2' },
  { name: 'Harrt Maggie', age: 18, id: '3' },
  { name: 'Boluwatife Moyosore', age: 16, id: '4' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLString},
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID},
    age: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // code to get data from db/other sources
        return _.find(data, {id: args.id });

      } 
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args ){
        return _.find(authors, {id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});