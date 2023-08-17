const userSchema = require("../schema/schema");
const Mongoose = require("mongoose");
const User = Mongoose.model("User", userSchema);
class product {
  constructor() {}
  async saveDataInDb(data) {
    await User.create(data);
    return {msg:"product added in db"};
  }

  async getDataFromDb(queryData) {
    return await User.aggregate([{$match:{brand:"apple"}},{$group : {_id : "$description", count : {$sum : 1}}},{$sort:{count:-1}}]);
  }
  async getDataFromTables(){
    return await User.aggregate([{$match:{id:"id"}},{$match:{des}}])
  }

  async updateDataInDb(queryData, updateData) {
    return await User.updateOne({id:queryData}, updateData);
  }

  async deleteDataInDb(queryData) {
    return await User.deleteOne({ id: queryData });
  }

  async findById(id){
    return await User.findOne({id:id});
  }
}
module.exports = product;


