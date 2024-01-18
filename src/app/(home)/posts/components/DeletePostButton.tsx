'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ConfirmationDialog from './ConfirmationDialog';

const DeletePostButton = ({ postId }: { postId: string }) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/posts/${postId}`);
			toast.success(`Post deleted successfully! Redirecting...`);
			setTimeout(() => {
				router.push('/');
				router.refresh();
			}, 200);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong...');
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className='border border-red-500 rounded-md 
						px-4 py-2 hover:bg-red-100 text-red-500 font-bold'
			>
				Delete
			</button>

			<ConfirmationDialog
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				confirmFunction={handleDelete}
			/>
		</>
	);
};

export default DeletePostButton;
