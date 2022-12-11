class NumberSystem {

	#base = 10;
	#symbols = [];

	get base() {
		return this.#base;
	}

	get symbols() {
		return this.#symbols;
	}

	constructor(base = 10, symbols = []) {
		this.#base = base;
		const symbolsSet = new Set();
		const symbolsList = [];
		if (symbols.length == 0) {
			if (base <= 10) {
				for (let i = 1; i < base; i++) {
					symbolsList.push(i + '');
				}
			} else {
				throw Error('Not enough symbols given');
			}
		}

		if (base > 10) {
			for (let i = 1; i < 10; i++) {
				symbolsList.push(i + '');
			}
		}
		for (let symbol of symbols) {
			symbolsList.push(symbol + '');
		}

		for (let symbol of symbolsList) {
			symbolsSet.add(symbol);
		}

		if (symbolsSet.size != symbolsList.length) {
			throw Error('Each symbol must be unique');
		}

		if (symbolsSet.size != base - 1) {
			throw Error(`Too few symbols given, you still need ${base - 1 - symbolsSet.size}`);
		}

		for (let symbol of symbolsSet) {
			if (symbol.length != 1) {
				throw Error('Each symbol can only be one character');
			}
			this.#symbols.push(symbol);
		}
	}

	/**
	 * 
	 * @param {int} input Input is assumed to be a base 10 integer
	 * @returns {String} Returns the number, converted to this system.
	 */
	convertNumberToSystem(input) {
		if (!Number.isInteger(input)) {
			throw Error('Invalid type');
		}

		let output = '';

		let restSum = input;

		let mostSignificantPosition;

		let i = 0;

		while (!mostSignificantPosition) {
			let number = this.getSignifianceAtPosition(i);
			if (input < number) {
				mostSignificantPosition = i-1;
				const previousNumber = this.getSignifianceAtPosition(mostSignificantPosition);
				const numberAtPosition = Math.floor(input/previousNumber);
				const numberToInsert = this.symbols[numberAtPosition-1];
				restSum -= numberAtPosition * previousNumber;
				output += numberToInsert;
				break;
			} else {
				i++;
			}

		}
		
		i = mostSignificantPosition - 1;

		for (let i = mostSignificantPosition - 1; i >= 0; i--) {
			const number = this.getSignifianceAtPosition(i);
			let numberToInsert = '';
			if (restSum >= number) {
				const numberAtPosition = Math.floor(restSum/number);
				numberToInsert = this.symbols[numberAtPosition-1];

				//numberToInsert = numberAtPosition;
				restSum -= numberAtPosition * number;
			} else if (output != '') {
				numberToInsert = '0';
			}

			output += numberToInsert;
		}
		return output;

	}
	/**
	 * 
	 * @param {String} input Input is a number (string) in this base system.
		@returns {int} Base 10 number
	 */

	convertNumberFromSystem(number) {
		let numberAsString = number + '';

		let result = 0;
		let i = 0;

		for (let char of numberAsString) {
			let position = numberAsString.length-1 - i;
			const value = this.getValueOfSymbol(char);
			if (value != 0) {
				result += value * Math.pow(this.base, position);
			}
			i++;
		}

		return result;



	}

	getSignifianceAtPosition(position) {
		return Math.pow(this.base, position);
	}

	getValueOfSymbol(number) {
		return this.symbols.findIndex(o => o == number) + 1;
	}

}

// module.exports = exports = NumberSystem;