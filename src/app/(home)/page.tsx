import Link from 'next/link';
import { getPosts } from '@/actions';
import PostCard from '../components/PostCard';
import { FaPlus } from 'react-icons/fa6';
import { SearchForm, SortForm } from '../components';

export default async function Home() {
	const posts = await getPosts();

	return (
		<div className='w-full'>
			{/* Menu */}

			<div className='flex items-center gap-10'>
				<Link href='/posts/create'>
					<button className='bg-black text-white rounded-md px-4 py-2'>
						New Post
					</button>
				</Link>

				{/* <SearchForm /> */}

				{/* <SortForm /> */}
			</div>

			{/* Posts */}
			<div className='flex flex-col gap-4 mt-10'>
				{posts?.map((post: any) => (
					<Link href={`/posts/${post.id}`} key={post.id}>
						<PostCard post={post} />
					</Link>
				))}
			</div>
		</div>
	);
}
