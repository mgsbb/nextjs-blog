import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/libs/prisma';
import getCurrentUser from '@/actions/getCurrentUser';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { postId: string } }
) {
	try {
		const body = await request.json();
		const currentUser = await getCurrentUser();
		const { title, content } = body;
		const postId = params.postId;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existingPost = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!existingPost) {
			return NextResponse.json({ message: 'No post with id found' });
		}

		const updatedPost = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				title,
				content,
			},
		});

		return NextResponse.json(updatedPost);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Server error' });
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { postId: string } }
) {
	try {
		const currentUser = await getCurrentUser();
		const postId = params.postId;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existingPost = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!existingPost) {
			return NextResponse.json({ message: 'No post with id found' });
		}

		const deletePost = await prisma.post.delete({
			where: {
				id: postId,
			},
		});

		return NextResponse.json({ message: 'Post deleted successfully' });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Server error' });
	}
}
