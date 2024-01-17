import PostForm from '../components/PostForm';

const initialState = {
	title: '',
	content: '',
};

const CreatePostPage = () => {
	return <PostForm isEdit={false} initialState={initialState} />;
};

export default CreatePostPage;
