import React, { createContext, useState, useContext } from "react";

const CollectionContext = createContext();
export const useCollections = () => useContext(CollectionContext);

export default function CollectionProvider ({ children }) {
	const [collection, setCollection] = useState({});

	const setClickedCollection = (data) => setCollection(data);

	return (
		<CollectionContext.Provider value={{ clickedCollection: collection, setClickedCollection}}>
			{children}
		</CollectionContext.Provider>
	);
};