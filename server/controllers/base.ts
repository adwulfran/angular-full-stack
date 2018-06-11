abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.status(200).json(count);
    });
  }

  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  // Get by nom
  getbynom = (req, res) => {
    this.model.findOne({ nom : req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  // Get by categorie
  getbycategorie = (req, res) => {
    this.model.find({ categorie : req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  // Get by nom
  getbyurltorrent = (req, res) => {
    this.model.findOne({ urltorrent : req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

// Get by plusieurs noms
  getbyplusnom = (req, res) => {

    this.model.find({ nom : new RegExp(req.params.id, "i") }).limit(10).exec(function(err, item)  {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }
  // Update by id
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

    //updatecart by id
    
  updatecart = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, 
      { $addToSet : { items : { nom : req.params.item, urltorrent : req.params.urltorrent, price : req.params.itemprice, qty : req.params.itemqty }}}, (err) => {
          if (err) { return console.error(err); }
          res.sendStatus(200);
    });
   
  }

  deletecart = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, 
      { $set : { items : [], totalcart : 0 }}, (err) => {
          if (err) { return console.error(err); }
         res.sendStatus(200);
    });
  }

  totalcart = (req, res) => {
    this.model.findOne({ _id: req.params.id }, function(err, c) {
      if (err) { return console.error(err); }
      if (!c) { console.log("aucun client"); return;}
      function getSum(total, num) {
        return total + num;
      }
      var someArray = c.items ;
      someArray.forEach((item, index) => {
        someArray[index] = Number(c.items[index].price);
        // console.log(item); // 9, 2, 5 // console.log(index); // 0, 1, 2
      });
                                
      console.log('le tableau someArray :' +someArray);
      if (someArray.length > 0) {
        const total = someArray.reduce(getSum); console.log("LE TOTAL VAUT :" +total);
        c.totalcart = total;
        //c.totalcart = c.items[0].nom+c.items[1].nom; console.log(c.items.length);
        c.save((err, user) => {
          console.log(user + " modifié!");
        })
      }
      else  { const total = 0; }
      res.sendStatus(200);
    });
   
  }

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
}

export default BaseCtrl;