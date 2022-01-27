import React, { useEffect, useState } from 'react';
import CoxBazar from './CoxBazar';

const CoxBazars = () => {
    const [spots, setSpots] = useState([]);
    // fetch data from database
    useEffect(() => {
        fetch('https://hidden-thicket-96670.herokuapp.com/travelSpots')
            .then(res => res.json())
            .then(data => setSpots(data.slice(0, 1)))
    }, [])
    return (
        <div>
            {
                <div style={{ backgroundColor: "skyblue" }}>
                    {
                        spots.map(spot => <CoxBazar key={spot._id} spot={spot}
                        >

                        </CoxBazar>)
                    }
                </div>
            }
        </div>
    );
};

export default CoxBazars;