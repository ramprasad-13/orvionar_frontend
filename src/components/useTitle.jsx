import React, { useEffect } from 'react'

const useTitle = (title) => {

    useEffect(()=>{
        document.title=`Orvionar | ${title}`
    },[title])
}

export default useTitle;
