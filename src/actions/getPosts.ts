import prisma from '@/libs/prisma';
import getSession from './getSession';

const getPosts = async () => {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const posts = prisma.post.findMany();

		return posts;
	} catch (error) {
		console.log(error);
	}
};

export default getPosts;
