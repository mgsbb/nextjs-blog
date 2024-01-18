'use client';
import React from 'react';
import axios from 'axios';

const DeletePostButton = ({ postId }: { postId: string }) => {
	return (
		<button
			onClick={() => axios.delete(`/api/posts/${postId}`)}
			className='border border-red-500 rounded-md 
						px-4 py-2 hover:bg-red-100 text-red-500 font-bold'
		>
			Delete
		</button>
	);
};

export default DeletePostButton;
