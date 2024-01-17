import prisma from '@/libs/prisma';
import getSession from './getSession';

const getCommentsByPostId = async (postId: string) => {
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

		const comments = await prisma.comment.findMany({
			where: { postId },
		});

		return comments;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default getCommentsByPostId;
