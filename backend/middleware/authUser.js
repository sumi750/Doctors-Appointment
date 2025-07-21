import jwt from 'jsonwebtoken';

// auth
const authUser = async(req,res,next)=>{
    try{

      const {token} = req.headers;
      
      if(!token){
        return res.status(401).json({ success: false, message: "Not authorized. Login again." });
      }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = tokenDecode.id
        
        next();

    }
    catch(error){
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

export default authUser