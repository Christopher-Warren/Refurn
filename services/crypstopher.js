const randomStringGen = () => {
  const randomArray = [];
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "j",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  // Second arg determines the length
  // of the array.
  for (let i = 0; i < 32; i++) {
    l = Math.floor(Math.random() * 26);

    n = Math.floor(Math.random() * 10);

    char = Math.floor(Math.random() * 3);

    // [0] will be a random lowercase letter a-z
    // [1] will be a random uppercase letter A-Z
    // [2] will be a random number 0-9
    const chars = [letters[l], letters[l].toUpperCase(), n];

    // Goes over chars, selects one of the 3 randomly
    // generated characters and pushes it to the array.
    randomArray.push(chars[char]);
  }
  const parsedString = randomArray.toString().replace(/,/g, "");

  return parsedString;
};
console.log(randomStringGen());
module.exports = randomStringGen;
