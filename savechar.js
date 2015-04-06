//    Save Character to File
//    This module interacts with the (filesystem / user)  to save the character data
//    
//    Takes 3 arguments. Path to file, data to write and a callback

var fs = require('fs');
var path = require('path');

module.exports = function(savePath, dataToSave, callback) {
  
    console.log('Writing character ' + dataToSave['name'] + '...');
    

    
    fs.writeFile( 
        savePath, 
        JSON.stringify(dataToSave, null, 4),
        'utf8', function(err) {
          
            if (err) {
              
                // Check that the folder 'vault' exists, and if not, make it
                if ( savePath.indexOf('./vault/') !== -1 ){ //false if no match
                
                    fs.readdir('./', function(err, list) { 
                        list.forEach(function(file){
                            // do something when vault folder does no exist
                            if ( path.dirname(file).indexOf('/vault') === -1 ) {
                                // make the vault folder
                                fs.mkdir('./vault', function(err){
                                    if ( err ) {
                                        //console.error( err )
                                    } else {
                                         console.log( 'Vault folder has been created.')
                                         //try to save again                                      
                                         fs.writeFile( 
                                            savePath, 
                                            JSON.stringify(dataToSave, null, 4),
                                            'utf8', function(err) {
                                                if ( err ) {
                                                  console.error( 'There was an error saving the character. ', err );
                                                }
                                            }
                                         )
                                    }
                                });
                                                                
                            } else if ( err ) {
                              console.error( err )
                            }
                            
                        });
                    }); 
                }
                        
            } else {
                //console.log("Character saved successfully!");
            }
        });
    return callback(null, savePath, dataToSave);
}
