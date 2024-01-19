'use client';

import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AuthInput from './AuthInput';

export default function AuthPage() {
	const session = useSession();
	const router = useRouter();
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/');
		}
	}, [session?.status, router]);

	const signInCredentials = () => {
		signIn('credentials', {
			...formData,
			redirect: false,
		}).then((callback) => {
			if (callback?.error) {
				toast.error('Invalid credentials');
			}
			if (callback?.ok) {
				toast.success('Success! Redirecting...');
				router.push('/');
			}
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (!isLogin) {
				await axios.post('/api/register', formData);
			}
			signInCredentials();
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(() => {
			return { ...formData, [e.target.name]: e.target.value };
		});
	};

	return (
		<main className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
			<form
				onSubmit={handleSubmit}
				className='mx-auto flex w-full flex-col gap-5  rounded-lg bg-white p-6 md:w-1/2 lg:w-1/3 '
			>
				<h1 className='text-center text-lg font-bold'>
					{isLogin ? 'Login' : 'Register'}
				</h1>

				{!isLogin && (
					<AuthInput
						label='Name'
						type='text'
						id='name'
						value={formData.name}
						onChange={handleChange}
					/>
				)}

				<AuthInput
					label='Email'
					type='email'
					id='email'
					value={formData.email}
					onChange={handleChange}
				/>
				<AuthInput
					label='Password'
					type='password'
					id='password'
					value={formData.password}
					onChange={handleChange}
				/>

				<button
					type='submit'
					className='rounded-md bg-gray-200 p-2 text-sm font-semibold text-gray-600
           hover:bg-gray-100'
				>
					{isLogin ? 'Sign In' : 'Sign Up'}
				</button>

				<div className='space-x-1 text-center text-sm text-gray-500'>
					<span>{isLogin ? 'New here?' : 'Already have an account?'}</span>
					<button
						type='button'
						onClick={() => {
							setIsLogin((prev) => !prev);
						}}
						className='underline'
					>
						{isLogin ? 'Register' : 'Login'}
					</button>
				</div>
			</form>
		</main>
	);
}
