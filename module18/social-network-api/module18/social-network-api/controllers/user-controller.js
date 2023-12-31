// Import User Model
const User = require('../models/User');

async function getAllUsers(req, res) {
    try {
        const users = await User.find(); // finds all users in the database
        res.json(users); // sends the users object in the response
    } catch (err) {
        res.status(500).json({ message: err.message }); // server error
    }
}


const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $push: { friends: params.friendId } },
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    removeFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $pull: { friends: params.friendId } },
            {new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;
