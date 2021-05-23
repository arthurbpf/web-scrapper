import { Request, Response } from 'express';
import { parse } from 'date-fns';
import cheerio from 'cheerio';
import api from '../api';

interface Podcast {
	title: string;
	linkToPodcast: string;
	description?: string;
	thumbnailImage: string;
	datePublished: Date;
	timestamp: Date;
}

export default async function getLatestPodcasts(req: Request, res: Response) {
	const { description: descriptionQuery } = req.query;

	if (descriptionQuery && typeof descriptionQuery !== 'string') {
		throw new Error('Invalid query');
	}

	const $ = cheerio.load((await api.get('Podcasts.aspx')).data);

	let podcasts: Podcast[] = [];

	$('ul.media-list li').each((i, e) => {
		podcasts[i] = {
			title: $(e).find('h4 a').text().replace('\n', '').trim(),
			linkToPodcast:
				(process.env.BASE_URL || '') +
				'/' +
				$(e).find('h4 a').prop('href'),
			thumbnailImage: $(e).find('img').prop('src'),
			datePublished: parse(
				$(e).find('div span:first-of-type.mis-text-sans').text(),
				'dd/MM/yyyy',
				new Date(0, 0, 0, 0),
			),
			timestamp: new Date(),
		};
	});

	podcasts = await Promise.all(
		podcasts.map(async (podcast) => {
			try {
				const $podcastPage = cheerio.load(
					(await api.get(podcast.linkToPodcast)).data,
				);

				podcast.description = $podcastPage('div.mis-text p').text();
			} catch (error) {
				podcast.description = 'No description found';
			} finally {
				return podcast;
			}
		}),
	);

	if (descriptionQuery) {
		podcasts = podcasts.filter((podcast) =>
			podcast.description?.includes(descriptionQuery),
		);
	}

	res.json(podcasts);
}
