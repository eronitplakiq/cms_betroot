const ObjectId = require('mongoose').Types.ObjectId;

const postService = require('./../services/postService');
const {
	validateCreatePostInput,
	validateUpdatePostInput,
} = require('./../validation/post');

const all = async (req, res) => {
	try {
		const posts = await postService.all();

		return res.json({
			success: true,
			data: {
				posts,
			},
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

const create = async (req, res) => {
	const { errors, isValid } = validateCreatePostInput(req.body);

	if (!isValid) {
		return res.status(422).json({
			success: false,
			errors,
		});
	}

	try {
		const { post } = await postService.create(req.user.id, req.body);

		return res.json({
			success: true,
			data: {
				post,
			},
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

const update = async (req, res) => {
	const { errors, isValid } = validateUpdatePostInput(req.body);

	if (!isValid) {
		return res.status(422).json({
			success: false,
			errors,
		});
	}

	if(!(await postService.checkIfUserIsAuth(req.user,req.params.id))){
			return res.status(401).json({
				success: false,
				errors: {
					msg : "Unauthorizate!"
				},
			});
	}

	try {
		const { post } = await postService.update(req.params.id, req.body);

		return res.json({
			success: true,
			data: {
				post,
			},
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

const like = async (req, res) => {
	if(await postService.isNotAllowed(req.user,req.params.slug)){
			return res.status(400).json({
				success: false,
				errors: {
					msg : "You are not allowed!"
				},
			});
	}

	try {
		const { post } = await postService.like(req.params.slug);

		return res.json({
			success: true,
			data: {
				post,
			},
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

const deletePost = async (req, res) => {

	if (!(await postService.checkIfUserIsAuth(req.user, req.params.id))) {
		return res.status(401).json({
			success: false,
			errors: {
				msg: 'Unauthorizate!',
			},
		});
	}

	try {
		if(!ObjectId.isValid(req.params.id)){
			return res.status(400).json({
				succes: false,
				msg: "Post Id is not a valid ObjectId"
			})
		}

		const { post } = await postService.deletePost(req.params.id);

		if(!post){
			return res.status(404).json({
				succes: false,
				msg: "Post Not found"
			})
		}

		return res.json({
			success: true,
			data: {
				msg: "Deleted successfully!",
				post,
			},
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

module.exports = {
	all,
	create,
	like,
	update,
	deletePost
};
