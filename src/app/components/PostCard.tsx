'use client';

import { Post } from '@prisma/client';
import { BsPen } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { LiaCommentAlt } from 'react-icons/lia';

const PostCard = ({ post }: { post: Post }) => {
	return (
		<div
			className='border border-gray-300 p-6 rounded-md w-full
     text-gray-500 flex flex-col gap-4'
		>
			<h2 className='font-semibold'>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem rem
				dolores adipisci minima laboriosam! Quibusdam, fuga cumque corporis
				provident dolore vero neque officia, modi ex quaerat iure, assumenda
				quod ipsum?
			</h2>

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
	);
};

export default PostCard;
