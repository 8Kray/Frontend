import React, { useState, useEffect } from 'react';
import './sponsori.css';
import axios from 'axios';
import { useAuth } from '../../components/AuthProvider';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


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
    const { isAdmin, user, setUser } = useAuth();

    const [sponsorsData, setSponsorsData] = useState([]);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [openDialogDell, setOpenDialogDell] = useState(false);
    const [newSponsorData, setNewSponsorData] = useState({
        sponsor: '',
        sponsorDetails: '',
        sponsorLink: '',
        users: {
            username: user.username,
        },
    });

    const [yearError, setYearError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [linkError, setLinkError] = useState(false);
    const [delActive, setDelActive] = useState(false);
    const [rezervUser, setRezerv] = useState(user.username);
    const [sponsorToDelete, setSponsorToDelete] = useState(null);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/get-by-username/${rezervUser}`);
                setUser(response.data);
                setRezerv(response.data.username);
                const response1 = await axios.get('http://localhost:8080/sponsors/getall');
                setSponsorsData(response1.data);

            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchData();
    }, [user.username]);


    const handleAddSponsor = () => {
        setOpenDialogAdd(true)
    };
    const handleDelSponsor = () => {
        setDelActive(true)
    };
    const handleAddDialogClose = () => {
        setOpenDialogAdd(false);
        // Resetarea valorilor din formular la închiderea dialogului
        setNewSponsorData({
            sponsor: '',
            sponsorDetails: '',
            sponsorLink: '',
            users: {
                username: user.username,
            },
        });
        setYearError(false);
        setNameError(false);
        setLinkError(false);
    };
    const handleDellDialogClose = () => {
        setDelActive(false);
        setOpenDialogDell(false);
        // Poți adăuga aici și altă logică în funcție de necesități
    };

    const handleDellDialogSave = () => {

        const fetchData = async () => {
            try {
                const responseuser = await axios.get('http://localhost:8080/users/getall');

                const foundUser = responseuser.data.find(users => users.email === user.email && users.password === user.password);

                if (foundUser) {
                    const userId = foundUser.id;
                    await axios.delete(`http://localhost:8080/sponsors/${sponsorToDelete}?userId=${userId}`);
                }
                const response = await axios.get('http://localhost:8080/sponsors/getall');
                setSponsorsData(response.data);
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchData();
        setDelActive(false);
        setOpenDialogDell(false);

    };
    const handleNewSponsorChange = (e) => {
        const { name, value } = e.target;
        setNewSponsorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setYearError(false);
        setNameError(false);
        setLinkError(false);
    };
    const handleAddSponsorSubmit = async () => {
        // Verificarea formatului anilor de sponsorizare cu regex
        const yearFormatRegex = /^\d{4}-\d{4}$/;
        const nameMaxLength = 15;
        const linkFormatRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        if (!yearFormatRegex.test(newSponsorData.sponsorDetails)) {
            setYearError(true);
            return;
        }

        if (newSponsorData.sponsor.length > nameMaxLength) {
            setNameError(true);
            return;
        }

        if (!linkFormatRegex.test(newSponsorData.sponsorLink)) {
            setLinkError(true);
            return;
        }
        const jsonString = JSON.stringify(newSponsorData);
        console.log(jsonString);
        try {
            await axios.post('http://localhost:8080/sponsors/add', newSponsorData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await axios.get('http://localhost:8080/sponsors/getall');
            setSponsorsData(response.data);
        } catch (error) {
            console.error('Error adding sponsor:', error);
        }


        handleAddDialogClose();
    };

    const handlerOpenDeleteDialog = (sponsorsID) => {
        setSponsorToDelete(sponsorsID);
        setOpenDialogDell(true);
    };
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
                    {delActive ? (
                        <CloseIcon className='delleteIcon' onClick={() => handlerOpenDeleteDialog(sponsor.sponsorsID)} />
                    ) : null}
                    <div key={sponsor.id} className='box'>

                        <div className='pozaSponsor'>
                            <img src={sponsorImages[sponsor.sponsor]} alt={`${sponsor.sponsor}`} />
                        </div>
                        <div className='infoSponsor'>
                            <h2>{sponsor.sponsor}</h2>
                            <p>Editie Sponsorizare: {sponsor.sponsorDetails}</p>
                            <p>Link site: <a href={sponsor.sponsorLink} target="_blank" rel="noopener noreferrer">{sponsor.sponsorLink}</a></p>
                        </div>
                    </div>
                </div>
            ))}
            {isAdmin ? (
                <div className='butoaneSponsori'>
                    <div>
                        <button
                            className='addButtonSponsor'
                            onClick={handleDelSponsor}
                        >
                            Delete Sponsor
                        </button>
                    </div>
                    <div>
                        <button
                            className='addButtonSponsor'
                            onClick={handleAddSponsor}
                        >
                            Add Sponsor
                        </button>
                    </div>
                </div>
            ) : (
                null
            )}

            {/* Dialog pentru adăugarea sponsorului */}
            <Dialog open={openDialogAdd} onClose={handleAddDialogClose}>
                <DialogTitle>Adăugare Sponsor</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Denumirea'
                        name='sponsor'
                        value={newSponsorData.sponsor}
                        onChange={handleNewSponsorChange}
                        fullWidth
                        margin='normal'
                        helperText={nameError && 'Denumirea nu poate depăși 15 caractere.'}
                        error={nameError}
                    />
                    <TextField
                        label='Anul Sponsorizarii'
                        name='sponsorDetails'
                        value={newSponsorData.sponsorDetails}
                        onChange={handleNewSponsorChange}
                        fullWidth
                        margin='normal'
                        helperText={
                            yearError
                                ? 'Formatul anilor de sponsorizare nu este valid (ex: 2023-2024).'
                                : 'Format valid: 2023-2024'
                        }
                        error={yearError}
                    />
                    <TextField
                        label='Link site sponsor'
                        name='sponsorLink'
                        value={newSponsorData.sponsorLink}
                        onChange={handleNewSponsorChange}
                        fullWidth
                        margin='normal'
                        helperText={linkError && 'Link-ul nu este valid.'}
                        error={linkError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose} color='primary'>
                        Anulează
                    </Button>
                    <Button onClick={handleAddSponsorSubmit} color='primary'>
                        Adaugă
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog pentru ștergerea sponsorului */}
            <Dialog open={openDialogDell} onClose={handleDellDialogClose}>
                <DialogTitle>Ștergere Sponsor</DialogTitle>
                <DialogContent>
                    <p> Sigur doriți să ștergeți sponsorul cu ID-ul selectat?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDellDialogClose} color='primary'>
                        Anulează
                    </Button>
                    {/* Adaugă aici funcționalitatea de ștergere a sponsorului */}
                    <Button onClick={handleDellDialogSave} color='primary'>
                        Șterge
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default Sponsori;