const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const PORT = 4000;


const auth = ({ req }) => {
	const tokenWithBearer = req.headers.authorization || '';
	const token = tokenWithBearer.split(' ')[1];
	let user;
	try {
		user = jwt.verify(token, process.env.JWT_SECRET);

	} catch (err) { return null;}
	return { user };
}

const server = new ApolloServer({ typeDefs, resolvers, context: auth });

//Other routes
app.get('/', (req, res) => {
	res.send('Home');
});

app.get('/about', (req, res) => {
	res.send('About');
});

server.applyMiddleware({ app, path: '/api' });

app.listen(PORT, () => {
	console.log(`The server is running on http://localhost:${PORT}${server.graphqlPath}`);
});