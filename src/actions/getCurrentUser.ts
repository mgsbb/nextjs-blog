import prisma from '@/libs/prisma';
import getSession from './getSession';
import clientPromiseMongo from '@/libs/mongodb';

const getCurrentUser = async () => {
	return functionMongo();
};

export default getCurrentUser;

const functionPrisma = async () => {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (error) {
		console.error(error);
		return null;
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

		const currentUser = await db
			.collection('User')
			.findOne({ email: session.user.email });

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (error) {
		console.error(error);
		return null;
	}
};
