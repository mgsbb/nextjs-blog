import React from 'react';
import { Comment } from '@prisma/client';
import { CiUser } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const CommentCard = ({
	comment,
	userId,
}: {
	comment: Comment;
	userId: string | undefined;
}) => {
	return (
		<div className='border rounded border-gray-300 text-gray-600 p-4 flex flex-col gap-2'>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem qui
				odio exercitationem odit perferendis modi fugiat, alias cum aut ea id
				nisi minima, quod unde, harum porro dolorum? Nulla, rem!
			</p>

			<div className='flex items-center justify-between'>
				<div className='flex gap-4 '>
					<div className='flex items-center gap-2'>
						<CiUser />
						<span className='text-sm'>User</span>
					</div>

					<div className='flex items-center gap-2'>
						<IoTimeOutline />

						<span className='text-sm'>Time</span>
					</div>
				</div>

				{userId === comment.id && (
					<div className='flex items-center gap-4'>
						<button>
							<FiEdit2 />
						</button>
						<button>
							<AiOutlineDelete />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentCard;
