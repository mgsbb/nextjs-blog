import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import getCurrentUser from '@/actions/getCurrentUser';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const currentUser = await getCurrentUser();
		const { comment, postId } = body;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const newComment = await prisma.comment.create({
			data: { comment, authorId: currentUser.id, postId },
		});

		return NextResponse.json(newComment);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Server error' });
	}
}
