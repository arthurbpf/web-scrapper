import express from 'express';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const server = express();

server.get('/', (req, res) => {
	res.send('SEND ITTTTT');
});

server.listen(process.env.PORT || 3333, () =>
	console.log('Server started! 🏁')
);
