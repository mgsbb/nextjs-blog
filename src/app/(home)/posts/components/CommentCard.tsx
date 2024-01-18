import React from 'react';
import { Comment } from '@prisma/client';
import { CiUser } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import AddComment from './AddComment';
import DeleteComment from './DeleteComment';
import { getUserById } from '@/actions';

const CommentCard = async ({
	comment,
	currentUserId,
}: {
	comment: Comment;
	currentUserId: string | undefined;
}) => {
	const author = await getUserById(comment.authorId);

	const ISOstring = comment.updatedAt.toISOString();

	const date =
		ISOstring.split('T')[0] + ' ' + ISOstring.split('T')[1].split('.')[0];

	return (
		<div className='border rounded border-gray-300 text-gray-600 p-4 flex flex-col gap-2'>
			<p>{comment.body}</p>

			<div className='flex items-center justify-between'>
				<div className='flex gap-4 '>
					<div className='flex items-center gap-2'>
						<CiUser />
						<span className='text-sm'>{author?.name}</span>
					</div>

					<div className='flex items-center gap-2'>
						<IoTimeOutline />

						<span className='text-sm'>{date}</span>
					</div>
				</div>

				{currentUserId === comment.authorId && (
					<div className='flex items-center gap-4'>
						<AddComment
							postId={comment.postId}
							comment={comment}
							buttonContent={<FiEdit2 />}
							isEdit={true}
						/>
						<DeleteComment commentId={comment.id} />
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentCard;
