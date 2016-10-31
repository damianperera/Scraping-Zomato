// testing json file write
var jsonfile = require('jsonfile')


var jsonfile = require('jsonfile')

var file = 'C:\\Users\\vasinpramu\\Documents\\GitHub\\Scraping-Zomato\\src\\resdata.json'
var obj = {name: 'JP'}

jsonfile.writeFileSync(file, [obj])
