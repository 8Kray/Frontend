import React, { useState } from 'react';
import './adminPage.css';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';

export const AdminPage = () => {
    const [hoveredRow, setHoveredRow] = useState(null);
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

    const addUserHandle = () => {
        // Logica pentru adăugarea unui utilizator
        const newUser = {
            id: users.length + 1,
            user: `user${users.length + 1}`,
            tip: 'nou',
        };
        setUsers([...users, newUser]);
    };

    const delUSer = (userId) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
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
            <div className='user-tabel' >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Utilizator</TableCell>
                                <TableCell>Tip cont</TableCell>
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
                                    <TableCell>{hoveredRow === row.id && <ClearIcon onClick={() => delUSer(row.id)} />}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={3} style={{ textAlign: 'right', paddingRight: '200px' }}>
                                    <AddIcon onClick={addUserHandle} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default AdminPage;
