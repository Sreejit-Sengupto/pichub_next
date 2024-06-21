import dbConnect from '@/lib/dbConnect';
export async function GET() {
    dbConnect()
        .then(() => console.log('Server connected to DB'))
        .catch((error) => console.log(error));
    return Response.json({ message: 'hello' });
}
