import React from 'react';
import Link from 'next/link';
import { getCommentsByPostId, getCurrentUser, getPostById } from '@/actions';
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
	const currentUser = await getCurrentUser();
	// const comments = await getCommentsByPostId(postId);
	const comments = [1, 2, 3];

	return (
		<div className='flex flex-col gap-16'>
			<div className='flex flex-col gap-4'>
				{/* Title */}
				<h1 className='text-4xl font-bold'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
					fugiat rerum, animi nesciun
				</h1>
				{/* Details, edit, delete */}
				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-10 text-gray-600'>
						<div className='flex items-center gap-10'>
							<div className='flex items-center gap-2'>
								<IoTimeOutline />
								<span>Time</span>
							</div>

							<div className='flex items-center gap-2'>
								<BsPen />
								<span>Author</span>
							</div>

							<div className='flex items-center gap-2'>
								<span>2</span>
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
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
				quaerat aliquid nihil dolore, repellendus deserunt ad labore tenetur
				dignissimos cum! Quo modi possimus eligendi aut debitis temporibus
				adipisci, repellendus labore! Lorem ipsum dolor sit, amet consectetur
				adipisicing elit. Similique quaerat aliquid nihil dolore, repellendus
				deserunt ad labore tenetur dignissimos cum! Quo modi possimus eligendi
				aut debitis temporibus adipisci, repellendus labore!Lorem ipsum dolor
				sit, amet consectetur adipisicing elit. Similique quaerat aliquid nihil
				dolore, repellendus deserunt ad labore tenetur dignissimos cum! Quo modi
				possimus eligendi aut debitis temporibus adipisci, repellendus
				labore!Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Similique quaerat aliquid nihil dolore, repellendus deserunt ad labore
				tenetur dignissimos cum! Quo modi possimus eligendi aut debitis
				temporibus adipisci, repellendus labore!Lorem ipsum dolor sit, amet
				consectetur adipisicing elit. Similique quaerat aliquid nihil dolore,
				repellendus deserunt ad labore tenetur dignissimos cum! Quo modi
				possimus eligendi aut debitis temporibus adipisci, repellendus
				labore!Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Similique quaerat aliquid nihil dolore, repellendus deserunt ad labore
				tenetur dignissimos cum! Quo modi possimus eligendi aut debitis
				temporibus adipisci, repellendus labore!
			</p>

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
						{comments?.map((comment: any) => (
							<CommentCard
								key={comment.id}
								comment={comment}
								currentUserId={currentUser?.id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
