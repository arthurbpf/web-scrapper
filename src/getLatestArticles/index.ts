import { Request, Response } from 'express';
import { parse } from 'date-fns';
import cheerio from 'cheerio';
import api from '../api';

interface Article {
	title: string;
	linkToArticle: string;
	thumbnailImage: string;
	author: string;
	datePublished: Date;
}

export default async function getLatestArticles(req: Request, res: Response) {
	const $ = cheerio.load((await api.get('Articles_Thumbs.aspx')).data);

	let articles: Article[] = [];
	$('ul.media-list li').each((i, e) => {
		articles[i] = {
			title: $(e).find('h4 a').text(),
			linkToArticle:
				(process.env.BASE_URL || '') + $(e).find('h4 a').prop('href'),
			thumbnailImage: $(e).find('img').prop('src'),
			author: $(e).find('div.mis-text-sans span:first-of-type').text(),
			datePublished: parse(
				$(e).find('div.mis-text-sans span:first-of-type').text(),
				'dd/MM/yyyy',
				new Date(0, 0, 0, 0),
			),
		};
	});

	res.json(articles);
}
