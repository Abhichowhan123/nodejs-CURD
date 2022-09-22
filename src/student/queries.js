
const getStudent = "SELECT * FROM student";
const getStudentById = "SELECT * FROM student WHERE id = $1";
const checkUniqueUserNameExists = "SELECT uniqueusername  FROM student  WHERE uniqueusername = $1";
// new user 
const addStudents = "INSERT INTO student(fullname,email,education,dob,uniqueusername) VALUES ($1,$2,$3,$4,$5)";
const removeStudent = "DELETE FROM student WHERE id = $1";
const updateStudent = "UPDATE student SEt name = $1 WHERE id =$2";
const getStudentNameNULL = "SELECT id,email From student WHERE fullname IS NULL";
const userInsert = "UPDATE student SET uniqueusername=$1 WHERE id = $2";
const getStudentFullname = "SELECT id,fullname From student WHERE fullname IS NOT NULL";
const getStudentByUserId = "SELECT * FROM student WHERE uniqueusername = $1";


// "SELECT * FROM ".$tableName." WHERE email='".$email."'";
module.exports={
    getStudent,
    getStudentById,
    checkUniqueUserNameExists,
    addStudents,
    removeStudent,
    updateStudent,
    getStudentNameNULL,
    userInsert,
    getStudentFullname,
    getStudentByUserId,
};