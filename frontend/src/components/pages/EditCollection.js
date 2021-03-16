import React from 'react';
import { useParams } from 'react-router';
import EnhancedTable from '../data_display/table';

// Fetch: `api/collection/edit/${data.id}`

export default function EditCollection() {
    let { collectionId } = useParams();

    return (
        <>
            <h3>Requested collection ID: {collectionId}</h3>
            <EnhancedTable />
        </>
    ) 
  }