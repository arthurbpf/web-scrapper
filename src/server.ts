import express from 'express';
import getLatestArticles from './getLatestArticles';
import getLatestPodcasts from './getLatestPodcasts';

const server = express();

server.get('/latest-articles', getLatestArticles);
server.get('/latest-podcasts', getLatestPodcasts);

server.listen(process.env.PORT || 3333, () =>
	console.log('Server started! 🏁'),
);
