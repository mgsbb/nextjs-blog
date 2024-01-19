import { ObjectId } from 'mongodb';

export type Post = {
	_id: ObjectId;
	title: string;
	content: string;
	authorId: ObjectId;
	commentIds: ObjectId[];
	createdAt: Date;
	updatedAt: Date;
};

export type User = {
	_id: ObjectId;
	email: string;
	hashedPassword: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	posts: Post[];
	comments: Comment[];
};

export type Comment = {
	_id: ObjectId;
	body: string;
	post: Post;
	postId: ObjectId;
	author: User;
	authorId: ObjectId;
	createdAt: Date;
	updatedAt: Date;
};
