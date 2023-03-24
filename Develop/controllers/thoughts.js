const {thoughts, users} = require('../models');


function getthoughts(req, res) {
    thoughts.find({})
    .then((thoughts) => res.status(200).json(thoughts))
    .catch((err) => res.status(500).json(err));
}

function getonethought (req, res) {
    thoughts.findOne({_id: req.params.thoughtid})
    .select("-__v")
    .then((thoughts) =>
    !thoughts
    ? res.status(500).json({message: "No thought found with ID"})
    : res.json(thoughts)
    )
    .catch((err) => res.status(500).json(err));
}

function createthoughts(req, res) {
    thoughts.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughts) =>
        !thought
          ? res.status(500).json({ message: "No user found with this ID!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  }

  function updatethoughts(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json(`No thought found with this ID!`);
        } else {
          res.status(200).json({message: "Thought updated!", thought: thought});
        }
      })
      .catch((err) => res.status(500).json(err));
  }

  module.exports = {
    getthoughts,
    getonethought,
    createthoughts,
    updatethoughts,

  };