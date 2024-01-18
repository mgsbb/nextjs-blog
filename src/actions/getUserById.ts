import prisma from '@/libs/prisma';
import getSession from './getSession';

const getUserById = async (userId: string) => {
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
		console.log(error);
		return null;
	}
};

export default getUserById;
