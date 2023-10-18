const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../controllers/user-controller');

// /api/users <GET>
router
    .route('/')
    .get(getAllUsers)

// /api/users/:id <GET, PUT, DELETE>
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId <POST, DELETE>
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
