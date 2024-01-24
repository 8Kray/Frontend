import React, { useState, useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import './personal.css';
import axios from 'axios';



const normalizeName = (name) => name.replace(/\s+/g, '').toLowerCase();


const stuffImages = {
    ioantcaciuc: process.env.PUBLIC_URL + '/juniori 2/ioan_tcaciuc_antrenor-removebg-preview.png',
    vasileboca: process.env.PUBLIC_URL + '/juniori 2/vasile_boca_coordonatorul_sectiei_de_juniori-removebg-preview.png',
    mihaivornicu: process.env.PUBLIC_URL + '/juniori 2/mihai_vornicu_kinetoterapeut-removebg-preview.png',
};


const Personal = () => {
    const [post, setPost] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    const [stuffData, sesStuffData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/players/all');
                sesStuffData(response.data);
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchData();
    }, []);


    const filteredStuff = stuffData.filter(player => player.statistic.includes('stuff'));


    const handleChange = (event) => {
        setPost(event.target.value);
    };

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value);
    };


    const filteredPlayers = filteredStuff.filter(player => {
        if (post === 'antrenor') {
            return (
                player.statistic.includes('stuff') &&
                (nameFilter === '' || player.playerName.toLowerCase().includes(nameFilter.toLowerCase()))
            );
        } else if (post === 'jucator') {
            return (
                !player.statistic.includes('stuff') &&
                (nameFilter === '' || player.playerName.toLowerCase().includes(nameFilter.toLowerCase()))
            );
        } else {
            return (
                (nameFilter === '' || player.playerName.toLowerCase().includes(nameFilter.toLowerCase()))
            );
        }
    });

    return (
        <div className='PersonalContainer'>
            <img
                src={
                    process.env.PUBLIC_URL +
                    '/374772816_874937010658932_698494937274974792_n.png'
                }
                alt="Echipa CSU Suceava"
                className="Image"
            />
            <div className='filtru'>
                <Typography>Filtre: </Typography>

                <FormControl className='dropdown'>
                    <InputLabel id="demo-simple-select-label">Post</InputLabel>
                    <Select
                        value={post}
                        label="Post"
                        onChange={handleChange}
                    >
                        <MenuItem value={"jucator"}>Jucator</MenuItem>
                        <MenuItem value={"antrenor"}>Antrenor</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className='nameFilter'>
                    <InputLabel htmlFor="name-filter">Nume Jucator</InputLabel>
                    <Input
                        id="name-filter"
                        value={nameFilter}
                        onChange={handleNameFilterChange}
                    />
                </FormControl>


            </div> {filteredPlayers.length === 0 ? (
                <div className='noPlayersFound'>
                    <Typography variant="subtitle1">Niciun jucător găsit conform filtrelor.</Typography>
                </div>
            ) : (
                filteredPlayers.map((player) => (
                    <div className='jucatori' key={player.id}>
                        <Typography className='profileText'>PROFIL</Typography>
                        <div key={player.id} className='box'>

                            <div className='pozaJucator'>
                                <img src={stuffImages[normalizeName(player.playerName)]} alt={`${player.playerName}`} />
                            </div>
                            <div className='infoJucator'>
                                {player.playerName && <p>Nume: {player.playerName}</p>}
                                {player.statistic && <p>nationalitate: {player.statistic.split(",")[0].trim()}</p>}
                                {player.playerDetails && <p>pozitie: {player.playerDetails}</p>}
                                {player.dataNastere && <p>Data nașterii: {player.dataNastere}</p>}
                                {player.inaltime && <p>Înălțime: {player.inaltime}</p>}
                            </div>

                        </div>
                        <div className='descriere'>{player.descriere}</div>
                    </div>
                ))
            )
            }
        </div>
    );

}

export default Personal;