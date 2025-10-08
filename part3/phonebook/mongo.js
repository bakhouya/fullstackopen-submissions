const mongoose = require('mongoose');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Error: give password as argument (ex: node mongo.js yourpassword)');
  process.exit(1);
}

const password = args[0];
const newName = args[1];
const newNumber = args[2];
const isListingOnly = args.length === 1;

const databaseName = 'phonebook';
const url = `mongodb+srv://mostafa_coure:${password}@cluster0.x62xwzn.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);
// const Person = mongoose.model('Person', personSchema, 'people');

mongoose.connect(url)
  .then(() => {
    console.log('Connect Database Succesfuly');
    if (!isListingOnly) {
      const person = new Person({ name: newName, number: newNumber });
      return person.save()
        .then(() => {
          console.log(`added ${newName} number ${newNumber} to phonebook`);
          mongoose.connection.close();
        });
    } else {
      return Person.find({})
        .then(people => {
          console.log('=====phonebook======:');
          people.forEach(person => {
            console.log(`${person.name} ${person.number}`);
          });
          mongoose.connection.close();
        });
    }
  })
  .catch((error) => {
    console.error('حدث خطأ في الاتصال أو العملية:', error.message);
    mongoose.connection.close();
    process.exit(1);
  });
