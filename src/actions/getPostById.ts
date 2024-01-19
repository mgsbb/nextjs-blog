import prisma from '@/libs/prisma';
import getSession from './getSession';
import clientPromiseMongo from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

const getPostById = async (postId: string) => {
	return functionMongo(postId);
};

export default getPostById;

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

		return post;
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

		return post;
	} catch (error) {
		console.error(error);
		return null;
	}
};
