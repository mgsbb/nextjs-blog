import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthContext from '@/context/AuthContext';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'NextJS Blog',
	description: 'NextJS Blog',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthContext>
					<header>
						<Navbar />
					</header>
					<main className='w-full md:w-4/5 flex mx-auto mt-4 p-10'>
						{children}
					</main>
				</AuthContext>
			</body>
		</html>
	);
}
