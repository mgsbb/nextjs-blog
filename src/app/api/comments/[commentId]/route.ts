import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/libs/prisma';
import getCurrentUser from '@/actions/getCurrentUser';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { commentId: string } }
) {
	try {
		const body = await request.json();
		const currentUser = await getCurrentUser();
		const { comment } = body;
		const commentId = params.commentId;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existingComment = await prisma.comment.findUnique({
			where: {
				id: commentId,
			},
		});

		if (!existingComment) {
			return NextResponse.json({ message: 'No comment with id found' });
		}

		const updatedComment = await prisma.comment.update({
			where: {
				id: commentId,
			},
			data: {
				body: comment,
			},
		});

		return NextResponse.json(updatedComment);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Server error' });
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { commentId: string } }
) {
	try {
		const currentUser = await getCurrentUser();
		const commentId = params.commentId;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const exisitngComment = await prisma.comment.findUnique({
			where: {
				id: commentId,
			},
		});

		if (!exisitngComment) {
			return NextResponse.json({ message: 'No comment with id found' });
		}

		const deleteComment = await prisma.comment.delete({
			where: {
				id: commentId,
			},
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Server error' });
	}
}
