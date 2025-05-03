import { Request, Response } from 'express';

interface User {
    id: string;
    name: string;
    email: string;
}

let users: User[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
    },
    {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
    },
    {
        id: '3',
        name: 'Charlie Brown',
        email: 'charlie@example.com',
    },
];

export const getUsers = (req: Request, res: Response): void => {
    res.json(users);
};

export const getUserById = (req: Request, res: Response): void => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
};

export const createUser = (req: Request, res: Response): void => {
    const { name, email } = req.body;
    const newUser: User = { id: Date.now().toString(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response): void => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
};

export const deleteUser = (req: Request, res: Response): void => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    users.splice(index, 1);
    res.status(204).send();
};
