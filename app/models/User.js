"use strict";
const  mongoose          			= require('mongoose')
      ,Schema            			= mongoose.Schema
      ,validate          			= require('mongoose-validator')
      ,validator              = require('validator')
      ,moment                 = require('moment')
      ,shortid                = require('shortid')
      ,passportLocalMongoose 	= require('passport-local-mongoose')      


mongoose.set('useCreateIndex', true)

var UserSchema = new Schema({
  email:         { type: String, required: [true, 'Email is required'], validate: validate({validator: 'isEmail',  message: 'Invalid email'}), unique: true, index: true },
  role:          { type: String },  
  createdAt:     { type: Date, default: Date.now }
})

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email', errorMessages: { MissingUsernameError: 'Please enter your email', UserExistsError: 'This email address is already registered' }})
module.exports = mongoose.model('User', UserSchema);
