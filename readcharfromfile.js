//
//    Loads a Character from a File
//    This module interacts with the (filesystem / user)  to load the character object data from a json formatted file.
//    
//    Takes 3 arguments. Path to file, data to read and a callback

var fs = require('fs');
var chardata = undefined;

module.exports = function(path, callback) {
  
    console.log(' Loading character...');

    var fileData = undefined;
    
    fs.readFile( 
        path, 
        'utf8',
        handleFile // trigger callback function
    );
    
    // callback function for readFile
    function handleFile(err, fileData) {
          
            if (err) {
                console.log("Failed to read file:", err);
            } 
            
            //  Parse JSON format file into object
            chardata = JSON.parse(fileData); 

            // log success to stdout with a little debug test
            console.log(' Successfully loaded stats for ' + chardata['name'] + '.\n');
            //console.log('Biography: ' + chardata['biography']);
            
            return callback(null, chardata);
        }
        
}
