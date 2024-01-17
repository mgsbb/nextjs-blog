import React from 'react';
import Link from 'next/link';
import { getPostById } from '@/actions';
import { BsPen } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { LiaCommentAlt } from 'react-icons/lia';
import DeleteButton from '../components/DeleteButton';

const PostPage = async ({
	params: { postId },
}: {
	params: { postId: string };
}) => {
	const post = await getPostById(postId);

	return (
		<div className='flex flex-col gap-10'>
			<div className='flex flex-col gap-4'>
				<h1 className='text-5xl font-bold'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
					fugiat rerum, animi nesciun
				</h1>
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

					<div className='flex gap-4'>
						<Link href={`/posts/${postId}/edit`}>
							<button className='border border-black rounded-md px-4 py-2 hover:bg-gray-100'>
								Edit
							</button>
						</Link>
						<DeleteButton postId={postId} />
					</div>
				</div>
			</div>

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
		</div>
	);
};

export default PostPage;
