import prisma from '@/libs/prisma';
import getSession from './getSession';

const getPostById = async (postId: string) => {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post) {
			return null;
		}

		return post;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default getPostById;
