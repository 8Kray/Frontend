import React from 'react';
import Slider from 'react-slick';
import './aboutUS.css'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Container, Typography, Card, CardContent, Button, CardMedia } from '@mui/material';


export const AboutUs = () => {
    // Datele despre trofee
    const trophies = [
        'data:image/jpeg;base64,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',
        'https://s13emagst.akamaized.net/products/55677/55676235/images/res_740e1ac91fc5baf0791cc58ddfd14cb6.jpg?width=450&height=450&hash=E07BDE1A979EE964DDBAC0BEA846F250',
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIRERgREREREhIQERASGBESERESHBwSGBQaGRgcGBkcIS4lHR4rHxgYKDgnKy8xODU2HCRIQDszPy40NjEBDAwMEA8QHxISHzcsJSs9ND07PTQ2NDQ3Oj04MTQ0PT00NDY9ND02PjQ0NDE0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NP/AABEIAP8AxQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQYCBAUDB//EAD0QAAIBAgQDBQUGBAUFAAAAAAECAAMRBBIhMQVBURMiYXGBBjJSkaEjQnKxwdEUguHwBxViY5IzQ3ODov/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQBBf/EACYRAQEAAgICAgIBBQEAAAAAAAABAhEDEiExBEFh8FEikaGx0TL/2gAMAwEAAhEDEQA/APs0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAgxBiAiIgIiICIiBMRECDOTh8Wf4hqZJsy3F72zDvEDzVh8p1H2PkZTOKVSlft1J+xqAMLm2UgKx9CiEnpm8Zl587hZYswx3tdZM8aFUOoYbMAfnPWaZdzatMRE6EREBERAREQEREBERAREQIiIgIiICIiAiYNVUbsB5kCa78RorvUT/leRueM913Ve9U90+Up1Z1bOW9x3dSG0uDy1853MVxygF0Yt5D95wqPDziKDruwXOpHxggj1Nj855/yc5nlJjdruOdZuur7K4klGoO13osVudyOvqCD/ADSwShcMrsrrXU6lDTqDS+Zdjr5n6dJv4nGvU7pfKbi3fueewFgJLi+TMcdX25lxW3cWmpXVRdmVR4kCan+b0CwRXzsTlsgLa+kpmJp00N7vUqEado7H1O2mn97i0cA4UtFc5OZ3AOa97A66fPX9pPDny5MuskjmWExm67kmIm1UREQEREBERAREQEiTECIiICIiAmhj8B2uoqVENvunT1E3pMjljMpquy68xTMdw2rT1dS6/Gl2+Y3E16aIdhe/iTL1ObjOD0qneAyN8S2F/MbGYeT4f3h/arseb6rkYHhqVNqiKfhCd7531ncwGAFG9mLFrakAbdLSuYrDVKDgNZlOzqba2uBbcHSdvD44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',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoY0FeVnLa6Uxx4PjQQzvMOwybbvBA24is7RrrsLl3lzIm5nwQ5peu7qtceQzRIf3bvLM&usqp=CAU',
    ];

    // Configurarea pentru react-slick
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
    };
    let lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaqueconsequatur corrupti officiis aspernatur illo veniam tempore a dolorum velit magnidignissimos mollitia fugiat itaque non libero quibusdam alias ipsum!'
    const istoricData = [
        { id: 1, data: '2023-01-01', eveniment: lorem },
        { id: 2, data: '2023-02-01', eveniment: lorem },
        { id: 3, data: '2023-03-01', eveniment: lorem },
        { id: 4, data: '2023-04-01', eveniment: 'lorem' },
        // Adaugă mai multe intrări în funcție de necesități
    ];

    return (
        <div className="AboutContainer">
            <img
                src={
                    process.env.PUBLIC_URL +
                    '/374772816_874937010658932_698494937274974792_n.png'
                }
                alt="Echipa CSU Suceava"
                className="Image"
            />
            <div className='viziune'>
                <Typography className='title' variant="h4">Viziune</Typography>
                <p>{lorem}{lorem}{lorem}</p>
            </div>

            <div className='istoric' >
                <Typography className='title' variant="h4">Istoric</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {istoricData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.data}</TableCell>
                                    <TableCell>{row.eveniment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


            <Container>
                <div className="trofee">
                    <Typography variant="h4" className='title'>Trofee</Typography>
                    <Slider {...sliderSettings}>
                        {trophies.map((trophy, index) => (
                            <div key={index} style={{ margin: '10px' }}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={`Trophy ${index + 1}`}
                                        height="400"
                                        image={process.env.PUBLIC_URL + trophy}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">Trophy {index + 1}</Typography>
                                        <Button variant="contained" color="primary">
                                            Trophy Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </div>
    );

}

