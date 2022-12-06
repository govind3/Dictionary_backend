const Word =require("../models/wordModel")
const asyncHandler = require("express-async-handler");

const getWords = asyncHandler(async (req, res) => {
  const words = await Word.find({ user: req.user._id });
  res.json(words);
});

const getWordById = asyncHandler(async (req, res) => {
  const word = await Word.findById(req.params.id);

  if (word) {
    res.json(word);
  } else {
    res.status(404).json({ message: "Word not found" });
  }
});

const createWord = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const word = new Word({ user: req.user._id, title, content, category });

    const createWord = await word.save();

    res.status(201).json(createWord);
  }
});

const UpdateWord = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const word = await Word.findById(req.params.id);

  if (word.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (word) {
    word.title = title;
    word.content = content;
    word.category = category;

    const UpdateWord = await word.save();
    res.json(UpdateWord);
  } else {
    res.status(404);
    throw new Error("Word not found");
  }
});

const DeleteWord = asyncHandler(async (req, res) => {
  const word = await Word.findById(req.params.id);

  if (word.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (word) {
    await word.remove();
    res.json({ message: "Word Removed" });
  } else {
    res.status(404);
    throw new Error("Word not Found");
  }
});

module.exports = {getWords,createWord,getWordById,UpdateWord,DeleteWord};
