import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CollectionDetail from '../collections/CollectionDetail';
import NewContent from '../content/NewContent';
import ContentTable from '../data_display/ContentTable';
import Fetch from '../fetch/Fetch';

export default function CollectionDetailPage() {
    const [startFetch, toggleFetch] = useState(false);
    const { collectionId } = useParams();

    useEffect(() => {
        toggleFetch(true)
        return () => {
          toggleFetch(false)
        }
      }, [])

    const editConfig = {
        'url': `api/collections/${collectionId}/`,
        'method': 'get',
    }

    const contentConfig = {
        'url': `api/collections/${collectionId}/content/`,
        'method': 'get',
    } 

    function DisplayEditField({data}) { 
        return (<CollectionDetail data={data} />);
    }

    function RenderContentTable({data}) {
        if (Object.keys(data).length !== 0) {
            return (<ContentTable rows={data} />);
        } else {
            return <Typography>There is no content in this collection</Typography>
        }
    }

    return (
        <>
            <div>
                {startFetch && <Fetch config={editConfig} renderSuccess={DisplayEditField}/>}
            </div>
            <div>
                <NewContent />
            </div>
            {startFetch && <Fetch config={contentConfig} renderSuccess={RenderContentTable}/>}
        </>
    )
}