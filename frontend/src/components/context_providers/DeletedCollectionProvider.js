import React, { createContext, useState, useContext } from "react";

const DeletedCollectionContext = createContext();
export const useDeletedCollections = () => useContext(DeletedCollectionContext);

export default function DeletedCollectionProvider ({ children }) {
	const [deletedCollectionId, setDelCollectionId] = useState();
	const [getData, setData] = useState([]);

	const setDeletedCollectionId = data => setDelCollectionId(data);

	function removeDeletedCollection() {
		if (getData) {
			setData(getData.filter(collection => collection.id !== deletedCollectionId))
			setDeletedCollectionId(false);
		}
	}

	return (
		<DeletedCollectionContext.Provider value={{ deletedCollectionId, setDeletedCollectionId, getData, setData, removeDeletedCollection}}>
			{children}
		</DeletedCollectionContext.Provider>
	);
};