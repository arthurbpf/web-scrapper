import { Request, Response } from 'express';
import { parse } from 'date-fns';
import cheerio from 'cheerio';
import api from '../api';

interface Article {
	title: string;
	linkToAuthor: string;
	linkToArticle: string;
	thumbnailImage: string;
	author: string;
	datePublished: Date;
	timestamp: Date;
}

export default async function getLatestArticles(req: Request, res: Response) {
	const { author: authorQuery } = req.query;

	if (authorQuery && typeof authorQuery !== 'string') {
		throw new Error('Invalid query');
	}

	const $ = cheerio.load((await api.get('Articles_Thumbs.aspx')).data);

	let articles: Article[] = [];
	$('ul.media-list li').each((i, e) => {
		articles[i] = {
			title: $(e).find('h4 a').text(),
			linkToArticle:
				(process.env.BASE_URL || '') + $(e).find('h4 a').prop('href'),
			thumbnailImage: $(e).find('img').prop('src'),
			author: $(e).find('div.mis-text-sans a').text(),
			linkToAuthor:
				(process.env.BASE_URL || '') +
				'/' +
				$(e).find('div.mis-text-sans a').prop('href'),
			datePublished: parse(
				$(e).find('div.mis-text-sans span:first-of-type').text(),
				'dd/MM/yyyy',
				new Date(0, 0, 0, 0),
			),
			timestamp: new Date(),
		};
	});

	if (authorQuery) {
		articles = articles.filter((article) =>
			article.author.includes(authorQuery),
		);
	}

	res.json(articles);
}
