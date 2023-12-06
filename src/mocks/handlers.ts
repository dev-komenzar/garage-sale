import { http, HttpResponse } from 'msw';

export const handlers = [
	http.post('/login', () => {
		sessionStorage.setItem('is-authenticated', 'true');

		return HttpResponse.json({ status: 200 });
	}),

	http.get<{}, null, { username: string | null }>('/user', () => {
		const isAuthenticated = sessionStorage.getItem('is-authenticated');

		if (!isAuthenticated) {
			return HttpResponse.json({ username: null }, { status: 403 });
		}

		return HttpResponse.json({ username: 'サンプルユーザー' }, { status: 200 });
	})
];
