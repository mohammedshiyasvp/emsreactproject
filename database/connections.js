const mongoose = require('mongoose')

mongoose.connect(process.env.baseurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("_____Mongodb Atlas Connected______");
}).catch(()=>{
    console.log("_____Mongodb Atlas Connection Error______");
})