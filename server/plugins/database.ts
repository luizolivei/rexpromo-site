import mongoose from "mongoose";

export default defineNitroPlugin(() => {
  mongoose.connect('mongodb://guiafacilhml:fBgviTVi04KQsRHVlfUnE@mongodb-ea.guiafacilsite.com:27017/guiafacilhml?replicaSet=mongodb-homolog-guiafacil&serverSelectionTimeoutMS=10000&directConnection=true');
});