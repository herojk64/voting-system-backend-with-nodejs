function search(req,res) {
    const {query} = req.params; 
    console.log(query);
    return res.json({message:"success"});
}

module.exports = search