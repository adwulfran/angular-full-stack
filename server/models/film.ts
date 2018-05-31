import * as mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
  nom: String,
  categorie: String,
  urltorrent :  String,
  openload : String,
  ligne : Number,
  price : Number
});

const Film = mongoose.model('Film', filmSchema);

export default Film;
