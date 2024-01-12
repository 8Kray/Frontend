import React from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import './personal.css';
import { useState } from 'react';


const players = [
    {
        id: 1,
        nume: 'Nume1',
        prenume: 'Prenume1',
        nationalitate: '1',
        pozitie: '1',
        dataNastere: '13.02.1998',
        inaltime: '190',
        poza: process.env.PUBLIC_URL + '/juniori 2/adrian_corde_inter_dreapta-removebg-preview.png',
        descriere: 'Lorem ipsum 1',
    },
    {
        id: 2,
        nume: 'Nume2',
        prenume: 'Prenume2',
        nationalitate: '1',
        pozitie: '1',
        dataNastere: '13.02.1999',
        inaltime: '190',
        poza: process.env.PUBLIC_URL + '/juniori 2/adrian_mircea_portar-removebg-preview.png',
        descriere: 'Lorem ipsum 2',
    },
    {
        id: 3,
        nume: 'Nume2',
        prenume: 'Prenume2',
        nationalitate: '1',
        pozitie: 'antrenor',
        dataNastere: '13.02.1999',
        inaltime: '190',
        poza: process.env.PUBLIC_URL + '/.png',
        descriere: 'Lorem ipsum 2',
    },
];

const Personal = () => {
    const [post, setPost] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [prenameFilter, setPrenameFilter] = useState('');



    const handleChange = (event) => {
        setPost(event.target.value);
    };

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value);
    };

    const handlePrenameFilterChange = (event) => {
        setPrenameFilter(event.target.value);
    };

    const filteredPlayers = players.filter(player => {
        if (post === 'antrenor') {
            return (
                player.pozitie === 'antrenor' &&
                (nameFilter === '' || player.nume.toLowerCase().includes(nameFilter.toLowerCase())) &&
                (prenameFilter === '' || player.prenume.toLowerCase().includes(prenameFilter.toLowerCase()))
            );
        } else if (post === 'jucator') {
            return (
                player.pozitie !== 'antrenor' &&
                (nameFilter === '' || player.nume.toLowerCase().includes(nameFilter.toLowerCase())) &&
                (prenameFilter === '' || player.prenume.toLowerCase().includes(prenameFilter.toLowerCase()))
            );
        } else {
            return (
                (nameFilter === '' || player.nume.toLowerCase().includes(nameFilter.toLowerCase())) &&
                (prenameFilter === '' || player.prenume.toLowerCase().includes(prenameFilter.toLowerCase()))
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

                <FormControl className='prenameFilter'>
                    <InputLabel htmlFor="prename-filter">Preume Jucator</InputLabel>
                    <Input
                        id="prename-filter"
                        value={prenameFilter}
                        onChange={handlePrenameFilterChange}
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
                                <img src={player.poza} alt={`${player.nume} ${player.prenume}`} />
                            </div>
                            <div className='infoJucator'>
                                <p>Nume: {player.nume}</p>
                                <p>Prenume: {player.prenume}</p>
                                <p>nationalitate: {player.nationalitate}</p>
                                <p>pozitie: {player.pozitie}</p>
                                <p>dataNastere: {player.dataNastere}</p>
                                <p>inaltime: {player.inaltime}</p>
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