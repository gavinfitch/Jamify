import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }

        fetchData();
    }, []);

    const usersComponent = users.map((user) => {
        return (
            <li key={user.id}>
                <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
            </li>
        );
    });

    return (
        <>
            <h1>Users List:</h1>
            <ul>{usersComponent}</ul>
        </>
    );
}

export default UsersList;
