const express=require("express");
const router=express.Router(); 

router.post('/foodData',(req,res)=>{
    try{
        // console.log(global.food_items);
        res.send([global.food_items,global.foodCategory])
    }catch(err){
        console.log(err.message);
        res.status(400).send("Server error");
    }
})
 

module.exports=router;