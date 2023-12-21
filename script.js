const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  // + sign changes the value from string to number

  // we check which boxes are checked
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  // that checks if the each one has true of false value, we need only true ones so we filter that out
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// functions to create random numbers/letters/etc we are goint to use charcode https://www.w3schools.com/charsets/ref_html_ascii.asp
// each character has certain number assign to it.

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  // we need to get number between 97-122, so we calculate random number rounded to full number x26 and plus 97.
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  // return String.fromCharCode(Math.floor(Math.random() * 11) + 33); that would be less symbols
  // or you we can do that this way:
  const symbols = "!@#$%^&*()<>{}[]+?,.?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
