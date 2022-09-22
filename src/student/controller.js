const { query } = require('express');
const pool = require('../../db')
const queries = require("./queries")
// generate Random String
function generateRandomString(lenght){
    var char = '0123456789mnbvcxzasdfghjklpoiuytrewqMNBVCXZASDFGHJKLPOIUYTREWQ';
    var random_string = '';
    if (lenght>0){
        for(var i = 0;i<lenght;i++){
            random_string+=char.charAt(Math.floor(Math.random()*char.length));
        }
    }
    return( random_string)
}
// checking UniqueUserName Exists Or Not
function checkUniqueUserNameExistsOrNot(uniqueUser){
    let len = 0
     pool.query(queries.checkUniqueUserNameExists,[uniqueUser],(error,result)=>{
            len = (result.rows.length)
        //     console.log(found, uniqueUser,result.rows.length)
            
        //     // router.post('/',controller.addStudents)
        //     // res.send("unique username already exists");
        //     const id = currProfile[1];
        //     pool.query(queries.userInsert,[uniqueUser,id],(error,results)=>{
        //         if (error)throw error;
        //          console.log(error)
        //         });                               
        // }
        // else{
        //     uniqueUser = currProfile[0] + generateRandomString(8);
            
        // }
});
  return len

}
// get all data in database
const getStudents = (req,res)=>{
    pool.query(queries.getStudent,(error,result)=>{
        if (error)throw error;
        res.status(200).json(result.rows);
    })
};
// get one  data using userid from database 
const  getStudentUserId = (req,res)=>{
    const userId= req.params.uniqueusername
    pool.query(queries.getStudentByUserId,[userId],(error,result)=>{
        if (error)throw error;
        res.status(200).json(result.rows);
    })
}
// get one  data using id from database 
const getStudentById =  (req,res)=>{
    const id =  parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}
// creat UniqueUserName using fullname
const  createUniqueUserNameUsingFullname = (req,res)=>{
    pool.query(queries.getStudentFullname,(error,result)=>{ //get all data  whose fullname in not null

        const profileArray = (result.rows)
        const n = profileArray.length;
        for(let i= 0; i<n; i++){
            uniqueUserName = profileArray[i].fullname+generateRandomString(8);
            console.log(profileArray[i].fullname)
            let Found = false
            while (!Found){
                let T = checkUniqueUserNameExistsOrNot(uniqueUserName)
                if (T===0){
                    const id = profileArray[i].id
                    pool.query(queries.userInsert,[uniqueUserName,id],(error,result)=>{
                        if (error)throw error;
                    });
                    Found = true
                }
                else{
                    uniqueUserName = profileArray[i].fullname+generateRandomString(8);
                }  
            }
        }
        res.status(200).send("Student UniqueUserName update successfully using fullname");

    });
}
// creat UniqueUserName using email without using fullname
const createUniqueUserNameUsingEmail = (req,res)=>{
    pool.query(queries.getStudentNameNULL,(error,result)=>{ //get all data  whose fullname in null 
        if (error)throw error;
        const profileArray = (result.rows)
        const N = profileArray.length;
        for (let i = 0; i < N; i++){
            const currProfile = [profileArray[i].email.substring(0, profileArray[i].email.lastIndexOf("@")), profileArray[i].id]
            // const randomString = generateRandomString(8); // calling Random String generater
            let uniqueUser = currProfile[0]+generateRandomString(8);
            let found = false
            while (!found ){
                let  t = checkUniqueUserNameExistsOrNot(uniqueUser)                       
                    // console.log(t)
                    if (t===0){
                        const id = currProfile[1];
                        pool.query(queries.userInsert,[uniqueUser,id],(error,results)=>{
                            if (error)throw error;
                            });
                            // console.log(uniqueUser)
                            found = true
                    }
                    else{
                        uniqueUser = currProfile[0] + generateRandomString(8);
                    }   
            }
          }
          res.status(200).send("Student UniqueUserName update successfully using email");          
    })
};
// add student
const addStudents = (req,res)=>{
    const RandomString = generateRandomString(8); // calling Random String generater
    const {fullname,email,education,dob} = req.body;
    const emailName =  req.body.email.substring(0,req.body.email.lastIndexOf("@"))
    const uniqueusername = emailName+RandomString;
    
    console.log(emailName)
    let found = false;
    while(!found){
        let T = checkUniqueUserNameExistsOrNot(uniqueusername)
                if (T===0){
                    pool.query(queries.checkUniqueUserNameExists,[uniqueusername],(error,result)=>{
                        if (result.rows.length){
                            router.post('/',controller.addStudents)
                            res.send("unique username already exists");
                        }    
                    });
                    found = true
                }
                else{
                    uniqueusername = emailName+generateRandomString(8);
                }  
    }
    // check if email exists or not 
    // pool.query(queries.checkUniqueUserNameExists,[uniqueusername],(error,result)=>{
    //     if (result.rows.length){
    //         router.post('/',controller.addStudents)
    //         res.send("unique username already exists");
    //     }    
    // });
    // add student to db
    pool.query(queries.addStudents,[fullname,email,education,dob,uniqueusername],(error,result)=>{
        if (error)throw error;
        res.status(200).send("Student created successfully");
    })
    

};
//remove student
const removeStudent = (req,res)=>{
    const id = parseInt(req.params.id);//parseInt is a function whichconvert string to id

    pool.query(queries.getStudentById,[id],(error,results)=>{
            const noStudentFound = !results.rows.length;
            if (noStudentFound){
                res.send("Student does not exit in the database");
            };
            pool.query(queries.removeStudent,[id],(error,result)=>{
                if (error)throw error;
                res.status(200).send("student remove successfully");
            });
    });
};
// update student
const updateStudent = (req,res)=>{
    const id =  parseInt(req.params.id);
    const{fullname} = req.body ;
    pool.query(queries.getStudentById,[id],(error,results)=>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound){
            res.send("Student does not exist in database  ");
        }
        pool.query(queries.updateStudent,[fullname,id],(error,results)=>{
            if (error)throw error;
            res.status(200).send("Student update successfully");

        });
    });
} 
module.exports  ={
    getStudents,
    getStudentById,
    addStudents,
    removeStudent,
    updateStudent,
    createUniqueUserNameUsingEmail,
    createUniqueUserNameUsingFullname,
    getStudentUserId,
    
    
};