import { Typography } from '@material-ui/core';
import React from 'react';
import { useFetch } from './UseFetch';

export default function Fetch({
	config,
	renderSuccess,
	loadingFallback = <p>loading...</p>,
	renderError = error => {
		console.log("rendering error")
		return <Typography>Error Occured. Please try again later.</Typography>
}	
}) {
	const { loading, data, error } = useFetch(config);
	if (loading) return loadingFallback;
	if (error) return renderError(error);
	if (data) return renderSuccess({ data });
}