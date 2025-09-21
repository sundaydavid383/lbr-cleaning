const express = require("express"); 
const router = express.Router();    
const { subscribe, getAllSubscribers, adminLogin, sendMessage,unSubscribe } = require("../controllers/subsrciberController");

router.post('/subscribe', subscribe);   
router.get('/subscribe', getAllSubscribers);
router.post('/admin-login', adminLogin);
router.post('/send-message', sendMessage);
router.post('/unsubscribe', unSubscribe);

module.exports = router;