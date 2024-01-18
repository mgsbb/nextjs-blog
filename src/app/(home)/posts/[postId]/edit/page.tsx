import React from 'react';
import PostForm from '../../components/PostForm';
import { getPostById } from '@/actions';

const PostEditPage = async ({
	params: { postId },
}: {
	params: { postId: string };
}) => {
	const post = await getPostById(postId);

	if (!post) {
		return <>Loading</>;
	}

	return (
		<PostForm
			isEdit={true}
			initialState={{ title: post?.title, content: post?.content }}
			postId={postId}
		/>
	);
};

export default PostEditPage;
