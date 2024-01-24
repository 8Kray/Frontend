import React, { useState, useEffect } from 'react';
import './sponsori.css';
import axios from 'axios';


const sponsorImages = {
    Celestin: process.env.PUBLIC_URL + '/sponsors/Celestin.png',
    USV: process.env.PUBLIC_URL + '/sponsors/Sigla-USV-scroll.png',
    Pepenero: process.env.PUBLIC_URL + '/sponsors/pepenero.png',
    Vivendi: process.env.PUBLIC_URL + '/sponsors/vivendi.png',
    Fiterman: process.env.PUBLIC_URL + '/sponsors/fiterman.png',
    Mihu: process.env.PUBLIC_URL + '/sponsors/mihu.png',
    IuliusMall: process.env.PUBLIC_URL + '/sponsors/im.png',
    Suceava: process.env.PUBLIC_URL + '/sponsors/suceava.png',
};

const Sponsori = () => {

    const [sponsorsData, setSponsorsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/sponsors/all');
                setSponsorsData(response.data);
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='SponsoriContainer'>
            <img
                src={
                    process.env.PUBLIC_URL +
                    '/374772816_874937010658932_698494937274974792_n.png'
                }
                alt="Echipa CSU Suceava"
                className="Image"
            />


            {sponsorsData.map((sponsor) => (
                <div className='sponsor'>
                    <div key={sponsor.id} className='box'>
                        <div className='pozaSponsor'>
                            <img src={sponsorImages[sponsor.sponsor]} alt={`${sponsor.sponsor}`} />
                        </div>
                        <div className='infoSponsor'>
                            <p>Editie Sponsorizare: {sponsor.sponsorDetails}</p>
                            <p>Link site: <a href={sponsor.sponsorLink} target="_blank" rel="noopener noreferrer">{sponsor.sponsorLink}</a></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default Sponsori;