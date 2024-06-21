import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/user.model';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, password } = await request.json();
        const existingUser = await User.findOne({
            username,
        });
        if (existingUser) {
            throw new Error('user with this username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 11);
        const createdUser = await User.create({
            username: username.toLowerCase(),
            password: hashedPassword,
        });
        if (!createdUser) {
            throw new Error('failed to create user');
        }
        console.log(createdUser);
        return Response.json(
            {
                status: true,
                message: 'User registered successfully',
            },
            { status: 201 },
        );
    } catch (error) {
        console.log('Error registering user');
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            { status: 500 },
        );
    }
}
