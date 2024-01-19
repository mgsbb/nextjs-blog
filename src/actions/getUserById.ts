import prisma from '@/libs/prisma';
import getSession from './getSession';
import clientPromiseMongo from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

const getUserById = async (userId: string) => {
	return functionMongo(userId);
};

export default getUserById;

const functionPrisma = async (userId: string) => {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return null;
		}

		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const functionMongo = async (userId: string) => {
	try {
		const client = await clientPromiseMongo;
		const db = client.db('db');

		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const user = await db
			.collection('User')
			.findOne({ _id: new ObjectId(userId) });

		if (!user) {
			return null;
		}

		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};
