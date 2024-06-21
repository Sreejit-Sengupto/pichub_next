import Navbar from '../../components/Navbar';

export default function DashboardLayout({
    children,
    sidepanel,
    images,
}: {
    children: React.ReactNode;
    sidepanel: React.ReactNode;
    images: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            <div>{children}</div>

            <div className='grid grid-cols-6 h-[100dvh]'>
                <div className='border border-l-2 h-[100dvh] col-span-1 hidden lg:block'>
                    {sidepanel}
                </div>
                <div className='col-span-6 lg:col-span-5'>{images}</div>
            </div>
        </div>
    );
}
