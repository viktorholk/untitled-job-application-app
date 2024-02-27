import type { RequestHandler } from '@sveltejs/kit';

import { post, remove } from '$lib/actions/fetching'
export async function POST({ request }) {
	const body = await request.json();

	const response = await post(
		'/profile/documents',
		{
			title: body.title,
            encoded: body.encoded,
		},
		body.token
	);

	return response;
}

