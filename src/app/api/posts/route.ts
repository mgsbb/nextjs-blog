import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import getCurrentUser from '@/actions/getCurrentUser';
import clientPromiseMongo from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
	try {
		const client = await clientPromiseMongo;
		const db = client.db('db');

		const body = await request.json();
		const currentUser = await getCurrentUser();
		const { title, content } = body;

		if (!currentUser?._id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const newPost = await db.collection('Post').insertOne({
			title,
			content,
			authorId: new ObjectId(currentUser._id),
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// const newPost = await prisma.post.create({
		// 	data: { title, content, authorId: currentUser.id },
		// });
		return NextResponse.json(newPost);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Server error' });
	}
}
