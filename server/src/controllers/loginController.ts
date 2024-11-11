import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const login = async (  
    req: Request,
    res: Response
  ): Promise<void> =>  {
    const { username, password } = req.body;
    try {
        const user = await prisma.users.findFirst({
            where: { username: username }
        });
            
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const payload = {
            user: {
                id: user.userId,
                username: user.username,
                userTypeId: user.userTypeId
            },
        };
        
        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error: ' + err);
    }
};

export const getLoginInfo = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user: { id: string } };
        const userId = decoded.user.id;

        const user = await prisma.users.findUnique({
            where: { userId: userId },
            select: {
                userId: true,
                userTypeId: true,
                username: true,
                email: true,
                password: true
            }
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error: ' + err);
    }
};