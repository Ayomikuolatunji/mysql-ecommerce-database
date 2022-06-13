const db=require('./models/Model');


const createPosts=async(req,res)=>{
    try{
        const post=await db.posts.create(req.body);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
}
 const getPosts=async(req,res)=>{
    try{
        const posts=await db.posts.findAll({});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
}
 const getPost=async(req,res)=>{
    try{
        const post=await db.posts.findOne({
            where:{id:req.params.id}
        });
        res.status(200).json(post)
    }catch(err){
        
    }  
}

module.exports={
    createPosts,
    getPosts,
    getPost
}