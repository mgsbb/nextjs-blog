import Link from 'next/link';
import { getPosts } from '@/actions';
import PostCard from './components/PostCard';
import { FaPlus } from 'react-icons/fa6';
import { SearchForm, SortForm } from './components';

export default async function Home() {
	// const posts = await getPosts();
	const posts: any = [1, 2, 3];

	return (
		<div className='w-full'>
			{/* Menu */}

			<div className='flex items-center gap-10'>
				<Link href='/create'>
					<button className='bg-black text-white rounded-md p-3'>
						<FaPlus />
					</button>
				</Link>

				<SearchForm />

				<SortForm />
			</div>

			{/* Posts */}
			<div className='flex flex-col gap-4 mt-10'>
				{posts?.map((post: any) => (
					<PostCard post={post} key={post.id} />
				))}
			</div>
		</div>
	);
}
