// Loads a character from the given character save file
// Displays information to stdout

var loadChar = require('./readcharfromfile.js');
var displayChar = require('./displaychar.js');
var data = undefined;
var character = undefined;

var filePath = './vault/' + process.argv[2];

character = loadChar( filePath, callback);

function callback(err, charData) {
    if ( err ) {
        console.error( err );
    } 

    displayChar(
        charData,
        function doneDisplaying(err, charData){
            if ( err ) {
                console.error('There was an error: ', err);
        } 
    });    

    return charData;

}