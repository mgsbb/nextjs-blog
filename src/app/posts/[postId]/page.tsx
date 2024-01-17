import React from 'react';
import Link from 'next/link';
import { getCommentsByPostId, getCurrentUser, getPostById } from '@/actions';
import { BsPen } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { LiaCommentAlt } from 'react-icons/lia';
import DeleteButton from '../components/DeleteButton';
import CommentCard from '../components/CommentCard';

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
								<button className='border border-black rounded-md px-4 py-2 hover:bg-gray-100'>
									Edit
								</button>
							</Link>
							<DeleteButton postId={postId} />
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

			<div className='flex flex-col gap-10'>
				<form className='flex flex-col gap-2'>
					<h3 className='font-semibold text-gray-500'>Post a comment</h3>
					<textarea
						id='commentBody'
						name='commentBody'
						rows={5}
						className='border border-gray-300 rounded-md w-full p-2'
					/>
					<button className='bg-black text-white rounded-md py-2 size-fit px-4'>
						Add
					</button>
				</form>

				<div>
					<h2 className='text-2xl font-semibold my-4'>Comments</h2>

					<div className='flex flex-col gap-4'>
						{comments?.map((comment: any) => (
							<CommentCard
								key={comment.id}
								comment={comment}
								userId={currentUser?.id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
