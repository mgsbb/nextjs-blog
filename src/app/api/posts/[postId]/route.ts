import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/libs/prisma';
import getCurrentUser from '@/actions/getCurrentUser';
import clientPromiseMongo from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { postId: string } }
) {
	try {
		const body = await request.json();
		const currentUser = await getCurrentUser();
		const { title, content } = body;
		const postId = params.postId;

		const client = await clientPromiseMongo;
		const db = client.db('db');

		if (!currentUser?._id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existingPost = await db
			.collection('Post')
			.findOne({ _id: new ObjectId(postId) });

		// const existingPost = await prisma.post.findUnique({
		// 	where: {
		// 		id: postId,
		// 	},
		// });

		if (!existingPost) {
			return NextResponse.json({ message: 'No post with id found' });
		}

		const updatedPost = await db
			.collection('Post')
			.updateOne(
				{ _id: new ObjectId(postId) },
				{ $set: { title, content, updatedAt: new Date() } }
			);

		// const updatedPost = await prisma.post.update({
		// 	where: {
		// 		id: postId,
		// 	},
		// 	data: {
		// 		title,
		// 		content,
		// 	},
		// });

		return NextResponse.json(updatedPost);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Server error' });
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { postId: string } }
) {
	try {
		const client = await clientPromiseMongo;
		const db = client.db('db');

		const currentUser = await getCurrentUser();
		const postId = params.postId;

		if (!currentUser?._id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existingPost = await db
			.collection('Post')
			.findOne({ _id: new ObjectId(postId) });

		// const existingPost = await prisma.post.findUnique({
		// 	where: {
		// 		id: postId,
		// 	},
		// });

		if (!existingPost) {
			return NextResponse.json({ message: 'No post with id found' });
		}

		const deletePost = await db
			.collection('Post')
			.deleteOne({ _id: new ObjectId(postId) });

		// const deletePost = await prisma.post.delete({
		// 	where: {
		// 		id: postId,
		// 	},
		// });

		return NextResponse.json({ message: 'Post deleted successfully' });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Server error' });
	}
}
