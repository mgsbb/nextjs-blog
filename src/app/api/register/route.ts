import bcrypt from 'bcrypt';

import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import clientPromiseMongo from '@/libs/mongodb';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, name, password } = body;

		const client = await clientPromiseMongo;
		const db = client.db('db');

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await db
			.collection('User')
			.insertOne({ email, name, hashedPassword });

		// prisma

		// const user = await prisma.user.create({
		// 	data: {
		// 		email,
		// 		name,
		// 		hashedPassword,
		// 	},
		// });

		return NextResponse.json(user);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Server error' });
	}
}
