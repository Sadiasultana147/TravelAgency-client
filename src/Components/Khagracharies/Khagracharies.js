import React, { useEffect, useState } from 'react';
import Khagrachari from './Khagrachari';

const Khagracharies = () => {
    const [spots, setSpots] = useState([]);
    // fetch data from database
    useEffect(() => {
        fetch('https://hidden-thicket-96670.herokuapp.com/travelSpots')
            .then(res => res.json())
            .then(data => setSpots(data.slice(2, 3)))
    }, [])
    return (
        <div>
            {
                <div style={{ backgroundColor: "skyblue" }}>
                    {
                        spots.map(spot => <Khagrachari key={spot._id} spot={spot}
                        >

                        </Khagrachari>)
                    }
                </div>
            }
        </div>
    );
};

export default Khagracharies;