import jwt from 'jsonwebtoken';

//admin auth
const authAdmin = async(req,res,next)=>{
    try{

      const {atoken} = req.headers;
      
      if(!atoken){
         return res.status(401).json({ success: false, message: "Not authorized. Login again." });
      }

        const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);

        if(
            tokenDecode.email !== process.env.ADMIN_EMAIL ||
            tokenDecode.password !== process.env.ADMIN_PASS){
          return res.json({success : false, message : "Not authrized login again "})
        }

        next();

    }
    catch(error){
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

export default authAdmin