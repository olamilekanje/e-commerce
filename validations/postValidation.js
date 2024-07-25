const yup = require('yup');

async function validatePost(data){

  const schema = yup.object().shape({
    title: yup.string().min(3).required(),
    body: yup.string().min(3).required()
  });

  try{
    await schema.validate(data);

    return null;

  }catch(error){
   // console.log(error.errors[0]);
      return error.errors[0];
  }

}
async function validateRegister(data){
  
    const schema = yup.object().shape({
      name: yup.string().min(3).required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required()
      });
      
    try{
      await schema.validate(data);
    
      return null;
    } catch (error) {
      return error.errors
      console.log(error.errors);
    }
    
    }
    module.exports.validatePost = validatePost;
    module.exports.validateRegister = validateRegister;