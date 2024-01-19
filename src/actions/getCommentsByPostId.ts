import prisma from '@/libs/prisma';
import clientPromiseMongo from '@/libs/mongodb';
import getSession from './getSession';
import { ObjectId } from 'mongodb';

const getCommentsByPostId = async (postId: string) => {
	return functionMongo(postId);
};

export default getCommentsByPostId;

const functionPrisma = async (postId: string) => {
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
		console.error(error);
		return null;
	}
};

const functionMongo = async (postId: string) => {
	try {
		const client = await clientPromiseMongo;
		const db = client.db('db');

		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const post = await db
			.collection('Post')
			.findOne({ _id: new ObjectId(postId) });

		if (!post) {
			return null;
		}

		const comments = await db
			.collection('Comment')
			.find({ postId: new ObjectId(postId) })
			.toArray();

		return comments;
	} catch (e) {
		console.error(e);
	}
};
