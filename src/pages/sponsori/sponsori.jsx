import React from 'react';
import './sponsori.css';

const editie = "2023-2024";
const sponsors = [
    {
        id: 1,
        name: 'Celestin',
        logo: process.env.PUBLIC_URL + '/sponsors/Celestin.png',
        link: 'https://www.tipografiacelestin.ro/',
        editie: editie,
    },
    {
        id: 2,
        name: 'USV',
        logo: process.env.PUBLIC_URL + '/sponsors/Sigla-USV-scroll.png',
        link: 'https://www.usv.ro/',
        editie: editie,
    },
    {
        id: 3,
        name: 'Pepenero',
        logo: process.env.PUBLIC_URL + '/sponsors/pepenero.png',
        link: 'https://pepeneropizza.ro/',
        editie: editie,
    },
    {
        id: 4,
        name: 'Vivendi',
        logo: process.env.PUBLIC_URL + '/sponsors/vivendi.png',
        link: 'https://restaurantvivendi.ro/',
        editie: editie,
    },
    {
        id: 4,
        name: 'Fiterman',
        logo: process.env.PUBLIC_URL + '/sponsors/fiterman.png',
        link: 'https://www.fitermanpharma.ro/',
        editie: editie,
    },
    {
        id: 5,
        name: 'Mihu',
        logo: process.env.PUBLIC_URL + '/sponsors/mihu.png',
        link: 'https://mihushop.ro/firma/',
        editie: editie,
    },
    {
        id: 6,
        name: 'IuliuMoll',
        logo: process.env.PUBLIC_URL + '/sponsors/im.png',
        link: 'https://suceava.iuliusmall.com/',
        editie: editie,
    },
    {
        id: 7,
        name: 'Suceava',
        logo: process.env.PUBLIC_URL + '/sponsors/suceava.png',
        link: 'https://ro.wikipedia.org/wiki/Suceava',
        editie: editie,
    },
];

const Sponsori = () => {

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


            {sponsors.map((sponsor) => (
                <div className='sponsor'>
                    <div key={sponsor.id} className='box'>
                        <div className='pozaSponsor'>
                            <img src={sponsor.logo} alt={`${sponsor.name}`} />
                        </div>
                        <div className='infoSponsor'>
                            <p>Editie Sponsorizare: {sponsor.editie}</p>
                            <p>Link site: <a href={sponsor.link} target="_blank" rel="noopener noreferrer">{sponsor.link}</a></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default Sponsori;