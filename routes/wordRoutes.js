const express=require('express');
const { getWords,createWord,getWordById,UpdateWord,DeleteWord} = require('../controllers/wordController');
const {protect} = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect,getWords);
router.route("/create").post(protect,createWord);
router.route("/:id").get(getWordById).put(protect,UpdateWord).delete(protect,DeleteWord);

module.exports=router;