const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const secret = require('../config').secret;
const Admin = require('./models/admin');

const adminLogin = (req, res) => {
  const {username, password} = req.body;
  const regex = new RegExp(["^", username, "$"].join(""), "i");
  Admin.findOne({username: regex})
  .then((user) => bcrypt.compare(password, user.hash, (err, same) => {
    user.tKey = Math.floor(Math.random() * (777777777 - 777) + 777);
    user.save();
    err || !same ? res.json('Credentials Dont Match') : res.json({token: jwt.encode({username: user.username, hash: user.hash, key: user.tKey}, secret)});
  }))
  .catch((err) => res.status(422).json('Credentials Dont Match'))
};

const createAdmin = (req, res) => {
  if(!req.admin) return res.status(401).json('UNAUTHORIZED ACCESS');
  const {username, password, name } = req.body;
  bcrypt.hash(password, 11, (err, hash) => {
    if(err) return res.status(422).json('HASH ERROR');
    const admin = new Admin({username, hash, name});
    admin.save((err) => {
      return err ? res.status(500).json(err) : res.json({token: jwt.encode({username, hash}, secret), message: `Successfully Added ${username}`});
    }); 
  });
};

const verify = (req, res, next) => {
  if(!req.headers.token) return res.status(401).json('UNAUTHORIZED ACCESS');
  user = jwt.decode(req.headers.token, secret);
  console.log(user.key);
  const regex = new RegExp(["^", user.username, "$"].join(""), "i");
  Admin.findOne({username: regex})
  .then((admin) => {
    if(admin.tKey === user.key) req.admin = true;
    if(admin.tKey === user.key) console.log("admin");
    next();
  })
  .catch((err) => {
    req.admin = false;
    next();
  })
};

const logout = (req, res) => {
  if(!req.headers.token) return res.status(401).json('CURRENTLY NOT LOGGED IN');
  const user  = jwt.decode(req.headers.token, secret);
  Admin.findOne({username:user.username, password: user.password})
  .exec((err, admin) => {
    admin.tKey = 0;
    admin.save();
    res.json({loggedOut: 1});
  });
}

const removeAdmin = (req, res) => {
  if(!req.admin) return res.status(401).json('UNAUTHORIZED ACCESS');
  if(!req.query.u) return res.status(422).json('Username Missing');
  Admin.findOneAndRemove({username: req.query.u})
  .then(admin => res.json(`SUCCESSFULLY DELETED ${admin.username}`))
  .catch(err => res.status(422).json(`${req.query.u} Not Deleted`));
};

const verify_user = (req, res) => {
  res.json(req.admin);
} 

const findAdmin =  (req, res) => {
  if(!req.admin) return res.status(401).json("Unathorized Access");
  Admin.find({}, {username: 1, _id: 1})
  .exec((err, users) => {
    if(err) return res.status(500).json(err);
    res.json(users);
  }); 
}

module.exports = (route) => {
  route.post('/admin/login', adminLogin);
  route.post('/admin/create', verify, createAdmin);
  route.delete('/admin/remove', verify, removeAdmin);
  route.get('/admin/verify', verify, verify_user);
  route.get('/admin/logout', logout);
  route.get('/search/admin', verify, findAdmin);
}