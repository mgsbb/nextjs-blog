'use client';
import axios from 'axios';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const DeleteComment = ({ commentId }: { commentId: string }) => {
	const router = useRouter();
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		axios.delete(`/api/comments/${commentId}`);
		setTimeout(() => {
			router.refresh();
		}, 1000);
	};

	return (
		<button onClick={handleClick}>
			<AiOutlineDelete />
		</button>
	);
};

export default DeleteComment;
