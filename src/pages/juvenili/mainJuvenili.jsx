import React from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Container, Input } from '@mui/material';
import './mainJ.css';
import { useState } from 'react';
import Slider from 'react-slick';
import Juvenili from './juvenili';

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
    const [categorie, setCategorie] = useState('');
    const [nameFilter, setNameFilter] = useState('');


    const handleChange = (event) => {
        setCategorie(event.target.value);

    };

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value);
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

            {categorie && <Juvenili categorie={categorie} nameFilter={nameFilter} />} {/* Aici transmiți doar categoria și filtrul de nume */}

        </div>
    );

}

export default MainJuvenili;