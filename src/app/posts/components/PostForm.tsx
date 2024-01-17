'use client';

import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { Post } from '@prisma/client';

const PostForm = ({
	initialState,
	isEdit,
	postId,
}: {
	initialState: { title: string; content: string };
	isEdit: boolean;
	postId?: string;
}) => {
	const [formState, setFormState] = useState(initialState);
	const router = useRouter();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isEdit) {
			axios.patch(`/api/posts/${postId}`, formState);
		} else {
			axios.post('/api/posts', formState);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-8 w-full mx-auto border rounded-md border-gray-300 p-10'
		>
			<div className='flex items-center w-full'>
				<button onClick={() => router.back()}>
					<FaArrowLeft className='text-2xl text-gray-600' />
				</button>

				<h1 className='text-2xl font-bold text-center w-full'>
					{isEdit ? 'Edit' : 'Create'} Post
				</h1>
			</div>

			<div className='flex flex-col md:flex-row gap-2 justify-center w-full'>
				<label htmlFor='title' className='w-1/5'>
					Title
				</label>
				<input
					type='text'
					id='title'
					name='title'
					className='px-4 py-2 border rounded-md border-gray-400 w-full'
					value={formState.title}
					onChange={(e) =>
						setFormState({ ...formState, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className='flex flex-col md:flex-row gap-2 justify-center w-full'>
				<label htmlFor='content' className='w-1/5'>
					Content
				</label>
				<textarea
					name='content'
					id='content'
					cols={30}
					rows={10}
					className='px-4 py-2 border rounded-md border-gray-400 w-full'
					value={formState.content}
					onChange={(e) =>
						setFormState({ ...formState, [e.target.name]: e.target.value })
					}
				></textarea>
			</div>

			<button
				type='submit'
				className='px-4 py-2 bg-black text-white rounded-md w-1/3 self-center'
			>
				Submit
			</button>
		</form>
	);
};

export default PostForm;
