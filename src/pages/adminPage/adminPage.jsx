import React, { useState } from 'react';
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

export const AdminPage = () => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        user: '',
        password: '',
        tip: 'admin',
    });
    const [userToDelete, setUserToDelete] = useState(null);

    const [users, setUsers] = useState([
        { id: 1, user: 'user1', tip: 'admin' },
        { id: 2, user: 'user2', tip: 'creator' },
        { id: 3, user: 'user3', tip: 'creator' },
        { id: 4, user: 'user4', tip: 'creator' },
    ]);

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
        // Logica pentru adăugarea unui utilizator
        const newUserObj = {
            id: users.length + 1,
            user: newUser.user,
            tip: newUser.tip,
        };
        setUsers([...users, newUserObj]);
        closeDialog();
    };
    const handleDeleteUser = () => {
        // Logica pentru ștergerea utilizatorului
        const updatedUsers = users.filter((user) => user.id !== userToDelete);
        setUsers(updatedUsers);
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
                                <TableCell>ID</TableCell>
                                <TableCell>Utilizator</TableCell>
                                <TableCell>Tip cont</TableCell>
                                <TableCell>Acțiuni</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onMouseEnter={() => handleMouseEnter(row.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.user}</TableCell>
                                    <TableCell>{row.tip}</TableCell>
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
                        name="user"
                        value={newUser.user}
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
                        <InputLabel id="tip-label">Tip cont</InputLabel>
                        <Select
                            labelId="tip-label"
                            id="tip"
                            name="tip"
                            value={newUser.tip}
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