import React, { useState, useEffect } from 'react';
import './adminPage.css';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useNavigate } from 'react-router';

const isAdmin = localStorage.getItem('isAdmin');
const isMedia = localStorage.getItem('isMedia');

export const AdminPage = () => {
    const navigate = useNavigate();
    const [hoveredRow, setHoveredRow] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        level: '',
    });
    const [userToDelete, setUserToDelete] = useState(null);
    const [usersData, setUSersData] = useState([]);




    useEffect(() => {
        const reqUsersList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/getall');
                setUSersData(response.data);
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };
        console.log(isAdmin)
        if (isAdmin !== 'true') {
            navigate('/');
        }

        reqUsersList();
    }, []);

    const handleMouseEnter = (rowId) => {
        setHoveredRow(rowId);
    };

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    const openDeleteDialog = (userId) => {
        setUserToDelete(userId);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    const addUserHandle = () => {
        openDialog();
    };

    const handleInputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddUser = () => {
        const newUserObj = {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            level: newUser.level,
        };

        const fetchData = async () => {
            try {
                await axios.post('http://localhost:8080/users/add', newUserObj);
                const response = await axios.get('http://localhost:8080/users/getall');
                setUSersData(response.data);
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchData();
        closeDialog();
    };
    const handleDeleteUser = () => {
        // Logica pentru ștergerea utilizatorului
        const fetchData = async () => {
            try {
                await axios.delete(`http://localhost:8080/users/delete/${userToDelete}`);
                const response = await axios.get('http://localhost:8080/users/getall');
                setUSersData(response.data);
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchData();
        closeDeleteDialog();
    };


    return (
        <div className='AdminContainer'>
            <img
                src={
                    process.env.PUBLIC_URL +
                    '/374772816_874937010658932_698494937274974792_n.png'
                }
                alt="Echipa CSU Suceava"
                className="Image"
            />
            <div className='user-tabel'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Utilizator</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Tip cont</TableCell>
                                <TableCell>Acțiuni</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onMouseEnter={() => handleMouseEnter(row.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.level}</TableCell>
                                    <TableCell>
                                        {hoveredRow === row.id && (
                                            <ClearIcon onClick={() => openDeleteDialog(row.id)} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={4} style={{ textAlign: 'right', paddingRight: '200px' }}>
                                    <AddIcon onClick={addUserHandle} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Adăugare utilizator</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Utilizator"
                        name="username"
                        value={newUser.username}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Parolă"
                        name="password"
                        type="password"
                        value={newUser.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="level-label">Tip cont</InputLabel>
                        <Select
                            labelId="level-label"
                            id="level"
                            name="level"
                            value={newUser.level}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="creator">Creator</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Anulează</Button>
                    <Button onClick={handleAddUser}>Adaugă</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirmare ștergere utilizator</DialogTitle>
                <DialogContent>
                    Ești sigur că dorești să ștergi acest utilizator?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Nu</Button>
                    <Button onClick={handleDeleteUser}>Da</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminPage;