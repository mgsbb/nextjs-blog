import prisma from '@/libs/prisma';
import getSession from './getSession';
import clientPromiseMongo from '@/libs/mongodb';

const getPosts = async () => {
	return functionMongo();
};

export default getPosts;

const functionPrisma = async () => {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const posts = await prisma.post.findMany();

		return posts;
	} catch (error) {
		console.error(error);
	}
};

const functionMongo = async () => {
	try {
		const client = await clientPromiseMongo;
		const db = client.db('db');

		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const posts = await db.collection('Post').find({}).toArray();

		return posts;
	} catch (error) {
		console.error(error);
	}
};
