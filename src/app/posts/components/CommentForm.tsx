'use client';
import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { Comment } from '@prisma/client';

const CommentForm = ({
	postId,
	isOpen,
	isEdit,
	setIsOpen,
	commentProp,
}: {
	postId: string;
	isOpen: boolean;
	isEdit: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	commentProp?: Comment;
}) => {
	const [comment, setComment] = useState(commentProp?.body);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isEdit) {
			axios.patch(`/api/comments/${commentProp?.id}`, {
				comment,
			});
		} else {
			axios.post('/api/comments', { comment, postId });
		}
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
			<div className='fixed inset-0 flex w-full items-center justify-center p-4'>
				<Dialog.Panel>
					<form
						onSubmit={handleSubmit}
						className='flex flex-col gap-2 bg-white w-[50vw] p-10 border border-gray-300 rounded-md'
					>
						<Dialog.Title className='font-semibold text-gray-500'>
							{isEdit ? 'Edit' : 'Post'} comment
						</Dialog.Title>
						<textarea
							id='commentBody'
							name='commentBody'
							rows={5}
							className='border border-gray-300 rounded-md w-full p-2'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button className='bg-black text-white rounded-md py-2 size-fit px-4 text-xs'>
							{isEdit ? 'Edit' : 'Post'}
						</button>
					</form>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default CommentForm;
