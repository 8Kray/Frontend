import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import './juvenili.css';
import axios from 'axios';

const normalizeName = (name) => name.replace(/\s+/g, '').toLowerCase();


const playersImages = {
    adriancorde: process.env.PUBLIC_URL + '/juniori 2/adrian_corde_inter_dreapta-removebg-preview.png',
    adrianmircea: process.env.PUBLIC_URL + '/juniori 2/adrian_mircea_portar-removebg-preview.png',
    alessiohalandut: process.env.PUBLIC_URL + '/juniori 2/alessio_halandut_portar-removebg-preview.png',
    alexandruhaluca: process.env.PUBLIC_URL + '/juniori 2/alexandru_haluca_portar-removebg-preview.png',
    alexandruradu: process.env.PUBLIC_URL + '/juniori 2/alexandru_radu_extrema_dreapta-removebg-preview.png',
    alexandrutivichi: process.env.PUBLIC_URL + '/juniori 2/alexandru_tivichi_extrema_stanga-removebg-preview.png',
    andreihostina: process.env.PUBLIC_URL + '/juniori 2/andrei_hostina_pivot-removebg-preview.png',
    andreimarcu: process.env.PUBLIC_URL + '/juniori 2/andrei_marcu_inter_stanga-removebg-preview.png',
    calinblindu: process.env.PUBLIC_URL + '/juniori 2/calin_blindu_inter_stanga-removebg-preview.png',
    cosminmujdei: process.env.PUBLIC_URL + '/juniori 2/cosmin_mujdei_pivot-removebg-preview.png',
    danielpopovici: process.env.PUBLIC_URL + '/juniori 2/daniel_popovici_centru-removebg-preview.png',
    georgealexandru: process.env.PUBLIC_URL + '/juniori 2/george_alexandru_pivot-removebg-preview.png',
    ionutbabiuc: process.env.PUBLIC_URL + '/juniori 2/ionut_babiuc_inter_dreapta-removebg-preview.png',
    iulianlupu: process.env.PUBLIC_URL + '/juniori 2/iulian_lupu_inter_stanga-removebg-preview.png',
    iustindanila: process.env.PUBLIC_URL + '/juniori 2/iustin_danila_extrema_stanga-removebg-preview.png',
    lucacazac: process.env.PUBLIC_URL + '/juniori 2/luca_cazac_inter_dreapta-removebg-preview.png',
    nicolaszapodianu: process.env.PUBLIC_URL + '/juniori 2/nicolas_zapodianu_pivot-removebg-preview.png',
    raresostafe: process.env.PUBLIC_URL + '/juniori 2/rares_ostafe_centru-removebg-preview.png',
    razvancosoreanu: process.env.PUBLIC_URL + '/juniori 2/razvan_cosoreanu_centru-removebg-preview.png',
};

const Juvenili = ({ categorie, nameFilter }) => {

    const [juveniliData, setJuveniliData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/players/all');
                setJuveniliData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchData();
    }, []);



    // Filtrare pentru a include doar jucătorii care nu au "stuff" în descriere
    const filteredPlayers = juveniliData.filter(player => !player.statistic.includes('stuff'));

    // Filtrare suplimentară în funcție de categorie
    const filteredAndCategorizedPlayers = filteredPlayers.filter(player =>
        categorie === 'jucatori' ? player.statistic === 'RO' : player.statistic === 'RO'
    );
    const filteredAndSearchedPlayers = filteredAndCategorizedPlayers.filter(player =>
        nameFilter === '' || player.playerName.toLowerCase().includes(nameFilter.toLowerCase())
    );
    return (
        <div>
            {filteredAndSearchedPlayers.length === 0 ? (
                <div className='noPlayersFound'>
                    <Typography variant="subtitle1">Niciun jucător găsit conform filtrelor.</Typography>
                </div>
            ) : (
                filteredAndSearchedPlayers.map((player) => (
                    <div className='jucatori' key={player.id}>
                        <Typography className='profileText'>PROFIL</Typography>
                        <div key={player.id} className='box'>
                            <div className='pozaJucator'>
                                <img src={playersImages[normalizeName(player.playerName)]} alt={`${player.playerName}`} />
                            </div>
                            <div className='infoJucator'>
                                {player.playerName && <p>Nume: {player.playerName}</p>}
                                {player.statistic && <p>nationalitate: {player.statistic}</p>}
                                {player.playerDetails && <p>pozitie: {player.playerDetails}</p>}
                                {player.dataNastere && <p>Data nașterii: {player.dataNastere}</p>}
                                {player.inaltime && <p>Înălțime: {player.inaltime}</p>}
                            </div>
                        </div>
                        <div className='descriere'>{player.descriere}</div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Juvenili;