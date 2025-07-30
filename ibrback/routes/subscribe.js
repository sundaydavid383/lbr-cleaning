const express = require("express"); 
const router = express.Router();    
const { subscribe, getAllSubscribers, adminLogin, sendMessage } = require("../controllers/subsrciberController");

router.post('/subscribe', subscribe);   
router.get('/subscribe', getAllSubscribers);
router.post('/admin-login', adminLogin);
router.post('/send-message', sendMessage);

module.exports = router;