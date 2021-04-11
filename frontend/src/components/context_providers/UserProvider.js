import React, { createContext, useContext, useReducer, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const reducer = (oldUser, newUser) => {
	if (newUser === undefined || Object.keys(newUser).length === 0) {
        localStorage.removeItem("user");
        return {}
	}
	return newUser
};
const localState = JSON.parse(localStorage.getItem("user"));

export default function UserProvider ({ children }) {
	const [ user, setUser ] = useReducer(reducer, localState && Object.keys(localState).length !== 0 ? localState : {});

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};