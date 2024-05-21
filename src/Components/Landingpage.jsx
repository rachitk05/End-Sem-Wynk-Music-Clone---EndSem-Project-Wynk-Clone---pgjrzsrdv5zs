import {useEffect, useState} from "react";

export default function Landingpage(){

    const [fetchedData,setFetchedData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://academics.newtonschool.co/api/v1/musicx/song", {
                    headers: {
                        'projectId': 'bng7dtu7whwk'
                    }
                });
                const data = await response.json();
                setFetchedData(data.data);
                console.log(data.data)
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        }
        fetchData();
    }, []);

    console.log(fetchedData)

    return(
        <div>

        </div>
    )
}