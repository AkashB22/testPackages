const mongoose = require('mongoose');

async function main(){
	try {
	  await mongoose.connect('mongodb://localhos:27017/test', { useNewUrlParser: true });
	} catch (error) {
	  handleError(error);
	}
}

function handleError(error){
	console.log(error);
}

main();