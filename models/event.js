var mongoose = require('mongoose')
  , Schema   = mongoose.Schema

var EventSchema = new Schema({
  type: { type: String },
  name: { type: String },
  req: { type: Schema.ObjectId, ref: 'Request' }
})

mongoose.model('ClickEvent', EventSchema)