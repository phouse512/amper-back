var argv = require('minimist')(process.argv.slice(2));


if(!argv['device']) {
	argv['device'] = 'generator';
}

if(!argv['minutes']) {
	argv['minutes'] = 5;
}

console.dir(argv);