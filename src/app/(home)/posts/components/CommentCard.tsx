import React from 'react';
// import { Comment } from '@prisma/client';
import type { Comment } from '@/types';
import { CiUser } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import AddComment from './AddComment';
import DeleteCommentButton from './DeleteCommentButton';
import { getUserById } from '@/actions';
import { ObjectId } from 'mongodb';

const CommentCard = async ({
	comment,
	currentUserId,
}: {
	comment: Comment;
	currentUserId: string;
}) => {
	const author = await getUserById(comment.authorId.toString());

	const ISOstring = comment.updatedAt.toISOString();

	const date =
		ISOstring.split('T')[0] + ' ' + ISOstring.split('T')[1].split('.')[0];

	return (
		<div className='border rounded border-gray-300 text-gray-600 p-4 flex flex-col gap-2'>
			<p className='break-words'>{comment.body}</p>

			<div className='flex items-center justify-between'>
				<div className='flex gap-4 '>
					<div className='flex items-center gap-2'>
						<CiUser />
						<span className='text-xs lg:text-sm'>{author?.name}</span>
					</div>

					<div className='md:flex items-center gap-2 hidden'>
						<IoTimeOutline />

						<span className='text-xs lg:text-sm'>{date}</span>
					</div>
				</div>

				{new ObjectId(currentUserId).equals(comment.authorId) && (
					<div className='flex items-center gap-4'>
						<AddComment
							postId={comment.postId.toString()}
							commentBody={comment.body}
							commentId={comment._id.toString()}
							buttonContent={<FiEdit2 />}
							isEdit={true}
						/>
						<DeleteCommentButton commentId={comment._id.toString()} />
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentCard;
