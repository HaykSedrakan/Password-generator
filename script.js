const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const symbolsEl = document.getElementById('symbols')
const numbersEl = document.getElementById('numbers')
let generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

resultEl.textContent = getRandomLower() + getRandomNumber() + getRandomSymbol() + getRandomUpper()
clipboardEl.addEventListener('click',() => {
    const textArea = document.createElement('textarea')

    const password = resultEl.innerText

    if(!password)
    {
        return 
    }

    textArea.value = password

    document.body.appendChild(textArea)

    textArea.select()
    document.execCommand('copy')

    textArea.remove()

    alert('Password copied to clickboard')
})


const randomFunc = {
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol,
}

generateEl.addEventListener('click',() => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerHTML = generatePassword(hasLower,hasUpper,hasSymbol,hasNumber,length)
})


function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

function getRandomLower(){
   return String.fromCharCode(Math.floor(Math.random() * 27) + 97 )
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 27) + 65)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
let symbol

function getRandomSymbol(){
    const symbols = '!@#$%&*(){}[]=<>/,.'
    
    return symbols[Math.floor(Math.random() * symbols.length)]
}

console.log(getRandomLower() + getRandomUpper() + getRandomSymbol())



