import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';


export function useFetch(config) {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
    const csrftoken = Cookies.get('csrftoken');
	const localState = JSON.parse(localStorage.getItem('user'));
	const [getLocalState, setLocalState] = useState({});


	function refreshToken() {
		config = {
			url: 'auth/token/refresh/',
			method: 'post',
			headers: { 
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			data: JSON.stringify({
				refresh: localState.tokens.refresh,
			}),
		}
		axios.request(config)
			.then((res)=> {
				localState.tokens.access = res.data.access
				localStorage.setItem('user', JSON.stringify(localState))
				setLocalState(localState)
				setError(null)
			})
			.catch((err) => {
				setError("refresh_token_expired")
				setLoading(false)
			})
	}

	useEffect(() => {
		getLocalState && Object.keys(getLocalState).length !== 0
		? axios.defaults.headers.common['Authorization'] = 'Bearer ' + getLocalState.tokens.access 
		: localState && Object.keys(localState).length !== 0
		? axios.defaults.headers.common['Authorization'] = 'Bearer ' + localState.tokens.access 
		: axios.defaults.headers.common['Authorization'] = ""

		if (!config) return;
		axios.request(config)
			.then((res) => {
				if (res.status === 204) {
					setData("deleted")
				} else setData(res.data)
			})
			.then(() => {
				setLoading(false)
			})
			.catch((err) => {
				if (err.response && err.response.data.code === "token_not_valid"){
					refreshToken()
				} else {
					setError(err)
					setLoading(false)
				}
			});
		}, [getLocalState]);

		useEffect(() => {
		}, [data, error, loading])

		return {
			loading,
			data,
			error
		};
}