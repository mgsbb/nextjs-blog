import React from 'react';
import PostForm from '../../components/PostForm';

const initialState = {
	title: '',
	content: '',
};

const PostEditPage = ({
	params: { postId },
}: {
	params: { postId: string };
}) => {
	return <PostForm isEdit={true} initialState={initialState} postId={postId} />;
};

export default PostEditPage;
