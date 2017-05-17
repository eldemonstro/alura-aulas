const mongoose = require('mongoose');

var schema = mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  grupo: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: false
  }
});

mongoose.model('Foto', schema);
