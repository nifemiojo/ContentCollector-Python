import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useParams } from 'react-router';
import ContentTable from "../data_display/ContentTable";
import Fetch from "../fetch/Fetch";

export default function PublicCollectionList() {
    const [startFetch, toggleFetch] = useState(false);
    const { collectionId } = useParams();

    useEffect(() => {
        toggleFetch(true)
        return () => {
          toggleFetch(false)
        }
      }, [])

    const config = {
        'url': `api/collections/${collectionId}/content/`,
        'method': 'get',
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
            {startFetch && <Fetch config={config} renderSuccess={RenderContentTable}/>}
        </>
    )
}