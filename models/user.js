const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь океанов',
  },
  avatar: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZTv_zgdMnmfkBCNTRIpnUDXImoMsQaZNdfy4t2Cji0KXRgMLA_doB0-GKPLqaYyqY4pM&usqp=CAU',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
