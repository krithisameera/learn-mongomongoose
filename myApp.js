require('dotenv').config();
const mongoose = require('mongoose');


let Person;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology:true });

//creating a schema (table in Traditional DB)
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: {
    type: [String]
  }
});
//creating a model
Person = mongoose.model('Person', personSchema);

const person1 = new Person({
  name: "krithi",
  age: 27,
  favoriteFoods: ["pancakes", "eggs","bread"]
});
const createAndSavePerson = (done) => {

  person1.save( (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
  
};
var arrayOfPeople = [
  {name: "sam", age: 53, favoriteFoods:["eggs","samosa","salads"]},
  {name: "rob", age:42, favoriteFoods:["pancakes","salads","rasinbran"]},
  {name: "jack", age:24, favoriteFoods:["ramen", "porkchops","lamb"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
};
var personName = "sam";
const findPeopleByName = (personName, done) => {
  Person.find({name: personName }, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
  
};

var food = "salads";
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]},  (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
};
//var personId = 1;
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return console.error(err);
      console.log("Result:", data);
      done(null, data);
  });
 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if(err) return console.error(err);
        console.log("Result:", data);
        done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updateDoc) => {
    if(err) return console.log(err);
    done(null , updateDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  });
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  });
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec((err, data) => {
    if(err) return console.log(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
