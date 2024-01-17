import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<Link href='/create'>
				<button className='bg-black text-white rounded-md px-4 py-2'>
					Create Post
				</button>
			</Link>
		</div>
	);
}
