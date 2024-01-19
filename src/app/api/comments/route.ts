import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import getCurrentUser from '@/actions/getCurrentUser';
import clientPromiseMongo from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const currentUser = await getCurrentUser();
		const { comment, postId } = body;

		const client = await clientPromiseMongo;
		const db = client.db('db');

		if (!currentUser?._id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const newComment = await db.collection('Comment').insertOne({
			body: comment,
			authorId: currentUser._id,
			postId: new ObjectId(postId),
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// const newComment = await prisma.comment.create({
		// 	data: { body: comment, authorId: currentUser.id, postId },
		// });

		return NextResponse.json(newComment);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Server error' });
	}
}
