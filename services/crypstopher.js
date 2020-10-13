module.exports = () => {
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
    // returns number 0-25
    for (let i = 0; i < 32; i++) {
      l = Math.floor(Math.random() * 26);

      n = Math.floor(Math.random() * 10);

      char = Math.floor(Math.random() * 3);

      const chars = [letters[l], letters[l].toUpperCase(), n];

      //console.log(chars[char]);
      randomArray.push(chars[char]);
    }
    //console.log(randomString.toString().replace(/,/g, ""));
    const randomString = randomArray.toString().replace(/,/g, "");
    //console.log(randomString);
    return randomString;
  };
  return randomStringGen();
  // console.log(`crypto: ${randomLetter()}`);
};
