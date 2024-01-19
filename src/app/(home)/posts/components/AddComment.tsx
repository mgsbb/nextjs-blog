'use client';
import { useState } from 'react';
// import { Comment } from '@prisma/client';
import type { Comment } from '@/types';
import CommentForm from '../components/CommentForm';
import { ObjectId } from 'mongodb';

const AddComment = ({
	postId,
	buttonStyles,
	buttonContent,
	isEdit,
	commentBody,
	commentId,
}: {
	postId: string;
	buttonStyles?: string;
	buttonContent: string | React.ReactNode;
	isEdit: boolean;
	commentBody?: string;
	commentId?: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<CommentForm
				commentId={commentId}
				postId={postId}
				isEdit={isEdit}
				setIsOpen={setIsOpen}
				isOpen={isOpen}
				commentBody={commentBody}
			/>
			<button onClick={() => setIsOpen(true)} className={buttonStyles}>
				{buttonContent}
			</button>
		</>
	);
};

export default AddComment;
