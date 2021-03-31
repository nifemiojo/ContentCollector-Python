import React from 'react';
import { useFetch } from './UseFetch';

export default function Fetch({
	config,
	renderSuccess,
	loadingFallback = <p>loading...</p>,
	renderError = error => (<pre>{JSON.stringify(error, null, 2)}</pre>)
}) {
	const { loading, data, error } = useFetch(config);
	if (loading) return loadingFallback;
	if (error) return renderError(error);
	if (data) return renderSuccess({ data });
}