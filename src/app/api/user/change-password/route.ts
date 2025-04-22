import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import bcrypt from 'bcrypt';

export async function PUT(req: Request) {
    await dbConnect()

    try {
        const { username, newPassword } = await req.json()
        const validUser = await User.findOne({ username })
        if (!validUser) {
            throw new Error('No user found');
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 11)
        validUser.password = newHashedPassword
        await validUser.save({ validateBeforeSave: false })
        return Response.json(
            {
                status: true,
                message: 'Password updated',
            },
            { status: 200 },
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Failed to update password',
            },
            { status: 500 },
        );
    }
}