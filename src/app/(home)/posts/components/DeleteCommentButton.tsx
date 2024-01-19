'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from './ConfirmationDialog';
import toast from 'react-hot-toast';
import { ObjectId } from 'mongodb';

const DeleteCommentButton = ({ commentId }: { commentId: string }) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const handleDelete = async () => {
		try {
			await axios.delete(`/api/comments/${commentId}`);
			toast.success(`Comment deleted successfully!`);
			setTimeout(() => {
				router.refresh();
			}, 200);
		} catch (error) {
			toast.error('Error deleting comment');
			console.error(error);
		}
	};

	return (
		<>
			<button onClick={() => setIsOpen(true)}>
				<AiOutlineDelete />
			</button>
			<ConfirmationDialog
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				confirmFunction={handleDelete}
			/>
		</>
	);
};

export default DeleteCommentButton;
