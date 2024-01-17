import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import getCurrentUser from '@/actions/getCurrentUser';

export async function POST(request: Request) {
	const body = await request.json();
	const currentUser = await getCurrentUser();
	const { title, content } = body;

	if (!currentUser?.id || !currentUser?.email) {
		return new NextResponse('Unauthorized', { status: 401 });
	}

	const newPost = await prisma.post.create({
		data: { title, content, authorId: currentUser.id },
	});
	return NextResponse.json(newPost);
}

export async function PATCH(request: Request) {}
