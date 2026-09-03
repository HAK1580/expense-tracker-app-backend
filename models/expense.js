const mongoose=require('mongoose');
const expenseSchema=mongoose.Schema({
    name:String,
    category:String,
    price:Number,
})
const expense=mongoose.model("saved_expenses",expenseSchema);

module.exports=expense;