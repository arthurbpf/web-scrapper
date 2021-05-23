import express from 'express';
import dotenv from 'dotenv';
import getLatestArticles from './getLatestArticles';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const server = express();

server.get('/latest-articles', getLatestArticles);

server.listen(process.env.PORT || 3333, () =>
	console.log('Server started! 🏁'),
);
