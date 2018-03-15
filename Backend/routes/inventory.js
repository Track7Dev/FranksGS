const Item = require('./models/item');
const Deal = require('./models/deal');

const createItem = (req, res) => {
  const {model, make, quanity, price, deal} = req.body;
  const item = new Item({model, make, quanity, price, deal});
  item.save();
  res.json("Item Added");
};

const getItems = (req, res) => {
  Item.find({})
  .exec((err, items) => {
    if(!err) return res.json(items);
  });
}

const getItem = (req, res) => {
  const id = req.params.id;
  Item.findById(id)
  .exec((err, item) => {
    if(!err) res.json(item);
  })
};

const getDeals = (req, res) => {
  Deal.find({})
  .populate('itemId', {}, Item)
  .exec((err, deals) => {
    if(!err) return res.json(deals);
  });
};

const makeDeal = (req, res) => {
  const itemId = req.params.itemId;
  const {percent, custom} = req.body;

  const deal = new Deal({itemId, percent, custom});
  deal.save((err) => {
    if(err) return res.json("Error adding deal");
    res.json('Deal Added');
  });
};

module.exports = (route) => {
  route.post('/item/create', createItem);
  route.get('/item/all', getItems);
  route.get('/item/:id', getItem);
  route.post('/item/deal/:itemId', makeDeal);
  route.get('/item/deal/all', getDeals);
}