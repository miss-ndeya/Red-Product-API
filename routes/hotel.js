const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

const hotelCtrl = require("../controllers/hotel");

router.post("/", multer, hotelCtrl.createHotel);
router.get("/:id", hotelCtrl.getOneHotel);
router.get("/test/:userId",  hotelCtrl.getUserHotels);
router.get("/", hotelCtrl.getAllHotel);
router.put("/:id", multer, hotelCtrl.modifyHotel);
router.delete("/:id", hotelCtrl.deleteHotel);

module.exports = router;
