import React, { useState, useEffect } from 'react';

const Overview = (props) => {

    const [loadedData, setLoadedData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    // executes AFTER the component has been rendered
    // only re-renders if the values are changed
    // useEffect with an empty array as a second arguement is equivalent to ComponentDidMount
    useEffect( () => {
        setIsLoading(true);
        fetch('https://api.covid19api.com/total/country/us')
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch')
            }
            return response.json();
        })
        .then(data => {
          let USdata = data[data.length -1];
          setLoadedData(USdata);
          console.log(USdata);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    }, []);

    return(
        <div>
            <p>Country: {loadedData.Country}</p>
            <p>Acitve: {loadedData.Active}</p>
            <p>Confirmed: {loadedData.Confirmed}</p>
            <p>Deaths: {loadedData.Deaths}</p>
        </div>
    )


}

export default Overview;