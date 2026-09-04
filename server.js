const express=require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose');
const port=process.env.PORT || 3000;
const expense=require('./models/expense')
require('dotenv').config();

app.use(express.json());
const corsOptions = {
  origin: 'https://expense-tracker-1580.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
async function main(){
    await mongoose.connect(process.env.MONGO_URI);
}
main().catch(err=>console.log(err));

app.post('/api/expenses',async(req,res)=>{
       try{
        const new_expense=await expense.create(req.body);
        res.status(201).json(new_expense);

       }catch(err){
        res.status(400).json(err);
        console.log("server error :",err)
       }
})
app.get('/api/expenses',async(req,res)=>{
       try{
        const saved_expenses=await expense.find();
         res.status(200).json(saved_expenses);

       }catch(err){
        res.status(400).json(err)
       }
})

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    
    const deletedItem = await expense.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.put('/api/expenses/:id',async (req,res)=>{
  const {id}=req.params;
  try{
    const updatedItem= await expense.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(updatedItem);
    if(!updatedItem){
      return res.status(404).json({message:"Item not found"})
    }
  }catch(err){
    res.status(500).json({message:"Server error",error:err.message})

  }

})
console.log("Loaded Port from .env:", process.env.PORT);



app.listen(port,()=>{
    console.log(`port is running at ${port}`)
})