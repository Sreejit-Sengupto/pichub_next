import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { Toaster } from 'react-hot-toast';

const karla = Karla({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pichub | Sharable Gallery',
    description: 'Share photos with your friend in a common gallery',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={karla.className}>
                <AuthProvider>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='dark'
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
