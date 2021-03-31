import axios from "axios";
import React, { useState, useEffect } from "react";

export function useFetch(config) {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!config) return;
		axios.request(config)
			.then((res) => setData(res.data))
			.then(() => setLoading(false))
			.catch((err) => {
				setLoading(false)
				setError(err)
			});
		}, [config]);

		return {
			loading,
			data,
			error
		};
}