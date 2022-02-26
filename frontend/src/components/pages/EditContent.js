import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ContentDetail from '../content/ContentDetail';
import Fetch from '../fetch/Fetch';


export default function EditContent() {
    const [startFetch, toggleFetch] = useState(true);
    const { collectionId, contentId } = useParams();


    const loadContentConfig = {
        'url': `api/collections/${collectionId}/content/${contentId}/`,
        'method': 'get',
    }

    useEffect(() => {
        return () => {
          toggleFetch(false)
        }
      }, [])

    function displayEditField({data}) {
        return <ContentDetail data={data}/>
    }

    return (
        <>
            {startFetch && <Fetch config={loadContentConfig} renderSuccess={displayEditField}/>}
        </>
    )
}