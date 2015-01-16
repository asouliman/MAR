var Keyboard = function () {
	document.addEventListener('keydown', Keyboard.onKeyDown, false);
	document.addEventListener('keyup', Keyboard.onKeyUp, false);
}

Keyboard.keys = {
	48: '0',
	49: '1',
	50: '2',
	51: '3',
	52: '4',
	53: '5',
	54: '6',
	55: '7',
	56: '8',
	57: '9',
	65: 'A',
	66: 'B',
	67: 'C',
	68: 'D',
	69: 'E',
	70: 'F',
	71: 'G',
	72: 'H',
	73: 'I',
	74: 'J',
	75: 'K',
	76: 'L',
	77: 'M',
	78: 'N',
	79: 'O',
	80: 'P',
	81: 'Q',
	82: 'R',
	83: 'S',
	84: 'T',
	85: 'U',
	86: 'V',
	87: 'W',
	88: 'X',
	89: 'Y',
	90: 'Z'
};

// Key states
Keyboard.state = {};

/**
 * Gets the key name from a keyCode
 */
Keyboard.keyName = function (keyCode) {
	return Keyboard.keys[keyCode];
}

/**
 *
 */
Keyboard.onKeyDown = function (event) {
	// Get the keyName
	var keyName = Keyboard.keyName(event.keyCode);
	Keyboard.state[keyName] = true;
}

/**
 *
 */
Keyboard.onKeyUp = function (event) {
	// Get the keyName
	var keyName = Keyboard.keyName(event.keyCode);
	Keyboard.state[keyName] = false;
}

Keyboard.prototype.update = function() {

};

Keyboard.prototype.isDown = function (keyName) {
	return Keyboard.state[keyName];
};

Keyboard.prototype.isUp = function (keyName) {
	return Keyboard.state[keyName];
};
