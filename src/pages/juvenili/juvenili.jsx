import React from 'react';
import { Typography } from '@mui/material';
import './juvenili.css';



const players = [
    {
        id: 1,
        nume: 'Nume1',
        prenume: 'Prenume1',
        nationalitate: '1',
        pozitie: 'cadet',
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
        pozitie: 'jucator',
        dataNastere: '13.02.1999',
        inaltime: '190',
        poza: process.env.PUBLIC_URL + '/juniori 2/adrian_mircea_portar-removebg-preview.png',
        descriere: 'Lorem ipsum 2',
    },
];

const Juvenili = ({ categorie }) => {

    const filteredPlayers = players.filter(player => categorie === 'jucatori' ? player.pozitie === 'jucator' : player.pozitie === 'cadet');
    return (
        <div >

            {filteredPlayers.map((player) => (
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
            ))}
        </div>
    );

}

export default Juvenili;