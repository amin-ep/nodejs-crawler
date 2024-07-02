import mongoose from 'mongoose';

const { Schema } = mongoose;

const websiteSchema = new Schema({
  name: String,
  domain: String,
  city: String,
  starRating: Number,
  expirationDate: String,
});

websiteSchema.pre(/^find/, function (next) {
  const query = this as mongoose.Query<string, string>;

  query.select('-__v');
  next();
});

export default mongoose.model('Website', websiteSchema);
