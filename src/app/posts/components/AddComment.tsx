'use client';
import { useState } from 'react';
import { Comment } from '@prisma/client';
import CommentForm from '../components/CommentForm';

const AddComment = ({
	postId,
	buttonStyles,
	buttonContent,
	isEdit,
	comment,
}: {
	postId: string;
	buttonStyles?: string;
	buttonContent: string | React.ReactNode;
	isEdit: boolean;
	comment?: Comment;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<CommentForm
				postId={postId}
				isEdit={isEdit}
				setIsOpen={setIsOpen}
				isOpen={isOpen}
				commentProp={comment}
			/>
			<button onClick={() => setIsOpen(true)} className={buttonStyles}>
				{buttonContent}
			</button>
		</>
	);
};

export default AddComment;
