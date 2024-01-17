'use client';
import axios from 'axios';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const DeleteComment = ({ commentId }: { commentId: string }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		axios.delete(`/api/comments/${commentId}`);
	};

	return (
		<button onClick={handleClick}>
			<AiOutlineDelete />
		</button>
	);
};

export default DeleteComment;
