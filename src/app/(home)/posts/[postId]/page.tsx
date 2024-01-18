import React from 'react';
import Link from 'next/link';
import {
	getCommentsByPostId,
	getCurrentUser,
	getPostById,
	getUserById,
} from '@/actions';
import { BsPen } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { LiaCommentAlt } from 'react-icons/lia';
import DeletePostButton from '../components/DeletePostButton';
import CommentCard from '../components/CommentCard';
import AddComment from '../components/AddComment';

const PostPage = async ({
	params: { postId },
}: {
	params: { postId: string };
}) => {
	const post = await getPostById(postId);

	if (!post) {
		return (
			<div className='flex flex-col gap-6 w-full mx-auto items-center justify-self-center'>
				<h1 className='text-2xl'>Post not found...</h1>
				<Link href='/'>
					<button className='bg-black text-white py-2 px-4 rounded-md size-fit'>
						Back home
					</button>
				</Link>
			</div>
		);
	}

	const currentUser = await getCurrentUser();

	const comments = await getCommentsByPostId(postId);

	const author = await getUserById(post.authorId);

	const authorName = author?.name;

	const ISOstring = post.updatedAt.toISOString();

	const date =
		ISOstring.split('T')[0] + ' ' + ISOstring.split('T')[1].split('.')[0];

	return (
		<div className='flex flex-col gap-16 w-full'>
			<div className='flex flex-col gap-4'>
				{/* Title */}
				<h1 className='text-4xl font-bold'>{post.title}</h1>
				{/* Details, edit, delete */}
				<div className='flex justify-between items-center w-full'>
					<div className='flex items-center gap-10 text-gray-600'>
						<div className='flex items-center gap-10'>
							<div className='flex items-center gap-2'>
								<IoTimeOutline />
								<span>{date}</span>
							</div>

							<div className='flex items-center gap-2'>
								<BsPen />
								<span>{authorName}</span>
							</div>

							<div className='flex items-center gap-2'>
								<span>{comments ? comments.length : 0}</span>
								<LiaCommentAlt />
							</div>
						</div>
					</div>

					{/* Render only if post created by current user */}
					{currentUser?.id === post?.authorId && (
						<div className='flex gap-4'>
							<Link href={`/posts/${postId}/edit`}>
								<button className='border border-black font-bold rounded-md px-4 py-2 hover:bg-gray-100'>
									Edit
								</button>
							</Link>
							<DeletePostButton postId={postId} />
						</div>
					)}
				</div>
			</div>

			{/* Content */}
			<p>{post.content}</p>

			{/* Comment */}

			<div className='flex flex-col gap-10 w-full'>
				<AddComment
					postId={postId}
					buttonStyles='bg-black text-white py-2 px-4 rounded-md size-fit'
					buttonContent='Post new comment'
					isEdit={false}
				/>

				<div>
					<h2 className='text-2xl font-semibold my-4'>Comments</h2>

					<div className='flex flex-col gap-4'>
						{comments?.length === 0 ? (
							<p>No comments yet</p>
						) : (
							comments?.map((comment: any) => (
								<CommentCard
									key={comment.id}
									comment={comment}
									currentUserId={currentUser?.id}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
