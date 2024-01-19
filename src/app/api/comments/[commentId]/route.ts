import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/libs/prisma';
import getCurrentUser from '@/actions/getCurrentUser';
import clientPromiseMongo from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { commentId: string } }
) {
	try {
		const body = await request.json();
		const currentUser = await getCurrentUser();
		const { comment } = body;
		const commentId = params.commentId;

		const client = await clientPromiseMongo;
		const db = client.db('db');

		if (!currentUser?._id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existingComment = await db
			.collection('Comment')
			.findOne({ _id: new ObjectId(commentId) });

		// const existingComment = await prisma.comment.findUnique({
		// 	where: {
		// 		id: commentId,
		// 	},
		// });

		if (!existingComment) {
			return NextResponse.json({ message: 'No comment with id found' });
		}

		const updatedComment = await db.collection('Comment').updateOne(
			{ _id: new ObjectId(commentId) },
			{
				$set: {
					body: comment,
					updatedAt: new Date(),
				},
			}
		);

		// const updatedComment = await prisma.comment.update({
		// 	where: {
		// 		id: commentId,
		// 	},
		// 	data: {
		// 		body: comment,
		// 	},
		// });

		return NextResponse.json(updatedComment);
	} catch (error) {
		console.error(error);
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

		const client = await clientPromiseMongo;
		const db = client.db('db');

		if (!currentUser?._id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const exisitngComment = await db
			.collection('Comment')
			.findOne({ _id: new ObjectId(commentId) });

		// const exisitngComment = await prisma.comment.findUnique({
		// 	where: {
		// 		id: commentId,
		// 	},
		// });

		if (!exisitngComment) {
			return NextResponse.json({ message: 'No comment with id found' });
		}

		const deleteComment = await db
			.collection('Comment')
			.deleteOne({ _id: new ObjectId(commentId) });

		// const deleteComment = await prisma.comment.delete({
		// 	where: {
		// 		id: commentId,
		// 	},
		// });

		return NextResponse.json({ message: 'Comment deleted successfully' });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Server error' });
	}
}
