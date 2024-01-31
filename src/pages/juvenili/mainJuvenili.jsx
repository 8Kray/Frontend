import React from 'react';
import {
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Input,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import './mainJ.css';
import { useState } from 'react';
import Slider from 'react-slick';
import Juvenili from './juvenili';
import { useAuth } from '../../components/AuthProvider';
import axios from 'axios';


const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
};
const premii = [
    {
        id: 1,
        loc: '1',
        an: '2023',
        tip: 'Competitie',
        denumire: 'Trofeu 1',
        pozaTrofeu: 'https://s13emagst.akamaized.net/products/55677/55676235/images/res_740e1ac91fc5baf0791cc58ddfd14cb6.jpg?width=450&height=450&hash=E07BDE1A979EE964DDBAC0BEA846F250'
    },
    {
        id: 2,
        loc: '3',
        an: '2023',
        tip: 'Turneu',
        denumire: 'Trofeu 2',
        pozaTrofeu: 'https://s13emagst.akamaized.net/products/55677/55676235/images/res_740e1ac91fc5baf0791cc58ddfd14cb6.jpg?width=450&height=450&hash=E07BDE1A979EE964DDBAC0BEA846F250'
    },
    {
        id: 3,
        loc: '3',
        an: '2020',
        tip: 'Turneu',
        denumire: 'Trofeu 3',
        pozaTrofeu: 'https://s13emagst.akamaized.net/products/55677/55676235/images/res_740e1ac91fc5baf0791cc58ddfd14cb6.jpg?width=450&height=450&hash=E07BDE1A979EE964DDBAC0BEA846F250'
    },
]
const MainJuvenili = () => {
    const { isAdmin, user, setUser } = useAuth();


    const [flag, setFlag] = useState(false);
    const [categorie, setCategorie] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [playerToDelete, setPlayerToDelete] = useState(null);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [openDialogDell, setOpenDialogDell] = useState(false);
    const [delActive, setDelActive] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [pozitieError, setpozitieError] = useState(false);
    const [nationalitateError, setNationalitateError] = useState(false);
    const [newPlayerData, setNewPlayerData] = useState({
        playerName: "",
        playerDetails: "",
        statistic: "",
        users: {
            username: user.username,
        },
    });

    const handleChange = (event) => {
        setCategorie(event.target.value);

    };

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value);
    };
    const handleAddPlayer = async () => {
        setOpenDialogAdd(true);
    };
    const handleDelPlayer = () => {
        setDelActive(true)
    };

    const handleAddDialogClose = () => {
        setOpenDialogAdd(false);
        // Resetarea valorilor din formular la închiderea dialogului
        setNewPlayerData({
            playerName: "",
            playerDetails: "",
            statistic: "",
            users: {
                username: user.username,
            },
        });
        setNameError(false);
        setpozitieError(false);
        setNationalitateError(false);
    };
    const handleDellDialogClose = () => {
        setDelActive(false);
        setOpenDialogDell(false);
        // Poți adăuga aici și altă logică în funcție de necesități
    };
    const handleDellDialogSave = () => {

        const fetchData = async () => {
            try {
                const respons = await axios.delete(`http://localhost:8080/players/delete/${playerToDelete}`);
                if (respons) {
                    setFlag((prev) => !prev);
                }

            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchData();
        setDelActive(false);
        setOpenDialogDell(false);
        setNameError(false);
        setpozitieError(false);
        setNationalitateError(false);

    };
    const handleNewPlayerChange = (e) => {
        const { name, value } = e.target;
        setNewPlayerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setNameError(false);
        setpozitieError(false);
        setNationalitateError(false);
    };
    const handleAddPlayerSubmit = async () => {
        const nameMaxLength = 30;

        // Validate playerName length
        if (newPlayerData.playerName.length > nameMaxLength) {
            setNameError(true);
            return;
        }

        // Validate pozitie (position)
        const validPozition = ['CENTRU', 'INTER DREAPTA', 'PORTAR', 'EXTREMA DREAPTA', 'PIVOT', 'INTER STANGA', 'EXTREMA STANGA', 'KINTETOTERAPEUT', 'ANTRENOR'];
        if (!newPlayerData.playerDetails.trim() ||
            !validPozition.includes(newPlayerData.playerDetails.toUpperCase())) {
            setpozitieError(true);
            return;
        }

        // Validate nationalitate (nationality)
        const validNationalities = ['RO', 'MD', 'UKR', 'RU', 'IT', 'BG'];
        if (
            !newPlayerData.statistic.trim() ||
            !validNationalities.includes(newPlayerData.statistic.toUpperCase())
        ) {
            setNationalitateError(true);
            return;
        }

        try {
            await axios.post('http://localhost:8080/players/add', newPlayerData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        } catch (error) {
            console.error('Error adding sponsor:', error);
        }

        setFlag((prev) => !prev);
        handleAddDialogClose();

    };
    const handleOpenDialogDell = (value) => {
        setOpenDialogDell(value);
    };
    const handlePlayerDelete = (playerID) => {
        setPlayerToDelete(playerID);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];

    };
    return (
        <div className='JuveniliContainer'>
            <img
                src={
                    process.env.PUBLIC_URL +
                    '/374772816_874937010658932_698494937274974792_n.png'
                }
                alt="Echipa CSU Suceava"
                className="Image"
            />

            <Container>
                <div className="premii">
                    <Typography className='profileText'>Premii</Typography>
                    <Slider {...sliderSettings}>
                        {premii.map((premiu, index) => (
                            <div key={index} className='sliderPremii'>
                                <h3 className='profileText'>{premiu.denumire} </h3>
                                <div className='infoJPremii'>
                                    <div className='textContainer'>
                                        <p>Loc Obtinut: {premiu.loc}</p>
                                        <p>Campionat: {premiu.tip}</p>
                                        <p>An desfasurare: {premiu.an}</p>
                                    </div>
                                    <img className='premiImg' src={premiu.pozaTrofeu} alt={`${premiu.pozaTrofeu}`} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>

            <div className='categorie'>
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                    <Select
                        value={categorie}
                        label="Categorie"
                        onChange={handleChange}
                    >
                        <MenuItem value={"jucatori"}>Jucatori</MenuItem>
                        <MenuItem value={"cadeti"}>Cadeti</MenuItem>
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

            </div>
            {isAdmin ? (
                <div className='butoaneSponsori'>
                    <div>
                        <button
                            className='addButtonSponsor'
                            onClick={handleDelPlayer}
                        >
                            Sterge Jucator
                        </button>
                    </div>
                    <div>
                        <button
                            className='addButtonSponsor'
                            onClick={handleAddPlayer}
                        >
                            Adauga Jucator
                        </button>
                    </div>
                </div>
            ) : (
                null
            )}
            {categorie && <Juvenili
                categorie={categorie}
                nameFilter={nameFilter}
                delActive={delActive}
                openDialogDell={openDialogDell}
                handleOpenDialogDell={handleOpenDialogDell}
                onPlayerDelete={handlePlayerDelete}
                flag={flag} />} {/* Aici transmiți doar categoria și filtrul de nume */}

            {/* Dialog pentru adăugarea jucatorului */}
            <Dialog open={openDialogAdd} onClose={handleAddDialogClose}>
                <DialogTitle>Adăugare jucator</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Nume'
                        name='playerName'
                        value={newPlayerData.playerName}
                        onChange={handleNewPlayerChange}
                        fullWidth
                        margin='normal'
                        helperText={nameError && 'Numele nu poate depăși 30 caractere.'}
                        error={nameError}
                    />
                    <TextField
                        label='Nationalitate'
                        name='statistic'
                        value={newPlayerData.statistic}
                        onChange={handleNewPlayerChange}
                        fullWidth
                        margin='normal'
                        helperText={
                            nationalitateError
                                ? 'Denumirea nu poate depăși 15 caractere.'
                                : 'Format valid: RO, MD, etc'}
                        error={nationalitateError}

                    />
                    <TextField
                        label='Pozitie'
                        name='playerDetails'
                        value={newPlayerData.playerDetails}
                        onChange={handleNewPlayerChange}
                        fullWidth
                        margin='normal'
                        helperText={pozitieError && 'Pozita nu este valida.'}
                        error={pozitieError}
                    />
                </DialogContent>
                <TextField
                    name='SponsorImage'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    fullWidth
                    margin='normal'
                />
                <DialogActions>
                    <Button onClick={handleAddDialogClose} color='primary'>
                        Anulează
                    </Button>
                    <Button onClick={handleAddPlayerSubmit} color='primary'>
                        Adaugă
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog pentru ștergerea jucatorului */}
            <Dialog open={openDialogDell} onClose={handleDellDialogClose}>
                <DialogTitle>Ștergere Jucator</DialogTitle>
                <DialogContent>
                    <p> Sigur doriți să ștergeți jucatorul selectat?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDellDialogClose} color='primary'>
                        Anulează
                    </Button>
                    {/* Adaugă aici funcționalitatea de ștergere a jucatorului */}
                    <Button onClick={handleDellDialogSave} color='primary'>
                        Șterge
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default MainJuvenili;