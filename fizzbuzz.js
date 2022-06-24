function fizzbuzz(input) {
  for (let i = 1; i <= input; i++) {
    if (i % 3 === 0) {
      i % 5 === 0 ? console.log("FIZZBUZZ") : console.log("FIZZ");
    } else if (i % 5 === 0) {
      console.log("BUZZ ");
    } else if (isNumPrime(i)) {
      console.log("FiZZBUZZ++");
    } else {
      console.log(i);
    }
  }
}
function isNumPrime(num) {
  const sqrtnum = Math.floor(Math.sqrt(num));
  let isPrime = num !== 1;
  for (let i = 2; i < sqrtnum + 1; i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }
  return isPrime;
}
fizzbuzz(500);
