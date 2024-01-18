import { getCommentsByPostId, getUserById } from '@/actions';
import { Post } from '@prisma/client';
import { BsPen } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { LiaCommentAlt } from 'react-icons/lia';

const PostCard = async ({ post }: { post: Post }) => {
	const ISOstring = post.updatedAt.toISOString();

	const date =
		ISOstring.split('T')[0] + ' ' + ISOstring.split('T')[1].split('.')[0];

	const author = await getUserById(post.authorId);

	const authorName = author?.name;

	const comments = await getCommentsByPostId(post.id);

	return (
		<div
			className='border border-gray-300 p-6 rounded-md w-full
     text-gray-500 flex flex-col gap-4'
		>
			<h2 className='font-semibold text-lg'>{post.title}</h2>

			<div className='flex items-center gap-10'>
				<div className='flex items-center gap-2'>
					<IoTimeOutline />
					<span className='text-xs'>{date}</span>
				</div>

				<div className='flex items-center gap-2'>
					<BsPen />
					<span className='text-xs'>{authorName}</span>
				</div>

				<div className='flex items-center gap-2'>
					<LiaCommentAlt />
					<span className='text-xs'>{comments ? comments.length : 0}</span>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
