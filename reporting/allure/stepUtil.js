const {

allure

} = require("allure-playwright");

class StepUtil{

async step(title,callback){

await allure.step(title,async()=>{

await callback();

});

}

}

module.exports=new StepUtil();