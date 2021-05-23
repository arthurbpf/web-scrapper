import express from 'express';
import dotenv from 'dotenv';
import getLatestArticles from './getLatestArticles';
import getLatestPodcasts from './getLatestPodcasts';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const server = express();

server.get('/latest-articles', getLatestArticles);
server.get('/latest-podcasts', getLatestPodcasts);

server.listen(process.env.PORT || 3333, () =>
	console.log('Server started! 🏁'),
);
