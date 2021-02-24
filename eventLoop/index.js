const bcrypt = require("bcrypt");

function measureLag(iteration) {
    const start = Date.now()
    setTimeout(() => {
        const lag = Date.now() - start
        console.log(`Loop ${iteration} took\t${lag} ms`)
        measureLag(iteration + 1) // Recurse
    })
  }
function hash() {
const start = new Date()
const hashRounds = 10 // The more hash rounds the longer hashing takes
bcrypt.hash("hash me!", hashRounds, () => {
    console.log(`--------- Hashing took ${new Date() - start} ms`)
    setTimeout(hash)
});
}
measureLag(1)
hash()