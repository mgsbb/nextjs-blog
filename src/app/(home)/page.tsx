import Link from 'next/link';
import { getPosts } from '@/actions';
import PostCard from './posts/components/PostCard';
import { Tooltip } from '@nextui-org/react';

export default async function Home() {
	const posts = await getPosts();

	if (!posts) {
		return <>An error has occurred</>;
	}

	return (
		<div className='w-full'>
			{/* Menu */}

			<div className='flex items-center justify-between gap-10'>
				<h1 className='text-2xl text-center font-semibold'>Browse posts</h1>

				<Link href='/posts/create'>
					<button className='bg-black text-white rounded-md px-4 py-2'>
						New Post
					</button>
				</Link>
			</div>

			{/* Posts */}
			{posts.length === 0 ? (
				<p className='mt-10'>No posts found</p>
			) : (
				<div className='flex flex-col gap-4 mt-10'>
					{posts?.map((post: any) => (
						<Tooltip key={post.id} content='Click to view post'>
							<Link href={`/posts/${post.id}`}>
								<PostCard post={post} />
							</Link>
						</Tooltip>
					))}
				</div>
			)}
		</div>
	);
}
