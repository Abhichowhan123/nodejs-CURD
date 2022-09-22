const {Router} = require('express');
const { route } = require('../../app');
const controller = require('./controller')
const router = Router();


router.get('/null/fullname',controller.createUniqueUserNameUsingEmail)
// new user fullname
router.get('/fullname',controller.createUniqueUserNameUsingFullname)
router.get('/',controller.getStudents)



//get detail by userId
router.get('/:uniqueusername',controller.getStudentUserId)
router.get('/:id',controller.getStudentById)
// new user
router.post('/',controller.addStudents)
router.delete("/:id",controller.removeStudent)
router.put('/:id',controller.updateStudent)


// router.get('/',(req,res)=>{
//     res.send("using api router");
// })

module.exports = router;