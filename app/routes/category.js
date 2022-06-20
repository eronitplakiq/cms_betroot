const router = require('express').Router();

const categoryController = require("../controllers/categoryController");
const isAuthenticated = require('./../middlewares/auth'); 
const adminOnly = require('./../middlewares/adminOnly'); 

router.get('/', categoryController.all);
router.post('/create', isAuthenticated, adminOnly, categoryController.create);
router.put('/:id/edit', isAuthenticated, adminOnly, categoryController.update);
router.delete(
	'/:id/delete',
	isAuthenticated,
	adminOnly,
	categoryController.deleteCategory
);

module.exports = router;
