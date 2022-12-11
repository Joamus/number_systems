// const NumberSystem = require('./number-system.js');


function convertNumberFromBase10ToNumberSystem() {
	try {
		clearErrorMessage();
	
		const base = parseInt(document.getElementById('chosen-base').value);
		const symbols = document.getElementById('chosen-symbols').value;
		const numberToConvert = parseInt(document.getElementById('base-10-number-to-convert').value);
	
		let symbolsAsList = symbols.trim().split(',');
		const numberSystem = new NumberSystem(base, symbolsAsList);
		const convertedNumber = numberSystem.convertNumberToSystem(numberToConvert);
	
		document.getElementById('converted-number').value = convertedNumber;

	} catch (err) {
		setErrorMessage(err);
	}

}

function convertNumberNumberSystemToBase10() {
	try {
		clearErrorMessage();
		const base = parseInt(document.getElementById('chosen-base').value);
		const symbols = document.getElementById('chosen-symbols').value;
		const numberToConvert = document.getElementById('number-from-number-system').value;
	
		let symbolsAsList = symbols.trim().split(',');
		const numberSystem = new NumberSystem(base, symbolsAsList);
		const convertedNumber = numberSystem.convertNumberFromSystem(numberToConvert);
	
		document.getElementById('converted-number-base-10').value = convertedNumber;
	} catch (err) {
		setErrorMessage(err);
	}

}

function clearAll() {
	for (let element of ['chosen-base', 'chosen-symbols', 'number-from-number-system', 'converted-number-base-10', 'converted-number', 'base-10-number-to-convert']) {
		document.getElementById(element).value = null;
	}
	clearErrorMessage();
}

function clearErrorMessage() {
	document.getElementById('error-message').innerText = null;
}

function setErrorMessage(error) {
	document.getElementById('error-message').innerText = error.message;
}