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
        pozaTrofeu: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIRERgREREREhIQERASGBESERESHBwSGBQaGRgcGBkcIS4lHR4rHxgYKDgnKy8xODU2HCRIQDszPy40NjEBDAwMEA8QHxISHzcsJSs9ND07PTQ2NDQ3Oj04MTQ0PT00NDY9ND02PjQ0NDE0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NP/AABEIAP8AxQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQYCBAUDB//EAD0QAAIBAgQDBQUGBAUFAAAAAAECAAMRBBIhMQVBURMiYXGBBjJSkaEjQnKxwdEUguHwBxViY5IzQ3ODov/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQBBf/EACYRAQEAAgICAgIBBQEAAAAAAAABAhEDEiExBEFh8FEikaGx0TL/2gAMAwEAAhEDEQA/APs0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAgxBiAiIgIiICIiBMRECDOTh8Wf4hqZJsy3F72zDvEDzVh8p1H2PkZTOKVSlft1J+xqAMLm2UgKx9CiEnpm8Zl587hZYswx3tdZM8aFUOoYbMAfnPWaZdzatMRE6EREBERAREQEREBERAREQIiIgIiICIiAiYNVUbsB5kCa78RorvUT/leRueM913Ve9U90+Up1Z1bOW9x3dSG0uDy1853MVxygF0Yt5D95wqPDziKDruwXOpHxggj1Nj855/yc5nlJjdruOdZuur7K4klGoO13osVudyOvqCD/ADSwShcMrsrrXU6lDTqDS+Zdjr5n6dJv4nGvU7pfKbi3fueewFgJLi+TMcdX25lxW3cWmpXVRdmVR4kCan+b0CwRXzsTlsgLa+kpmJp00N7vUqEado7H1O2mn97i0cA4UtFc5OZ3AOa97A66fPX9pPDny5MuskjmWExm67kmIm1UREQEREBERAREQEiTECIiICIiAmhj8B2uoqVENvunT1E3pMjljMpquy68xTMdw2rT1dS6/Gl2+Y3E16aIdhe/iTL1ObjOD0qneAyN8S2F/MbGYeT4f3h/arseb6rkYHhqVNqiKfhCd7531ncwGAFG9mLFrakAbdLSuYrDVKDgNZlOzqba2uBbcHSdvD44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'
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
            username: "",
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
                username: "",
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
        newPlayerData.users.username = user.username;
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