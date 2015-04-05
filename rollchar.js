
//  Name: rollchar - A Dark Heresy Character Generator
//  Author: Darren Kearney
//  Date: 03 April 2015
//  Description:
//      This program generates character stats and other bits 
//      for Dark Heresy characters according to the main rulebook.
//      The program is split into a few modules.
//
//      * Generate a character from provided arguments (argv)
//      * Display character from passed character object
//      * Save character to a file
//      * Load character from a file
//

//  Initializing variables & required modules
///////////////////////////////////////////////////////////////////////////////

var generateNewChar = require('./charmodule.js');
var displayChar = require('./displaychar.js');
var saveChar = require('./savechar.js');
var loadChar = require('./readcharfromfile.js');

var character = undefined;
var charVault = [];


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}



// Help menu
if ( process.argv[2] === 'help' || process.argv[2] === '/?' ) {
  
    console.log(' rollchar - A Dark Heresy Character Generator');
    console.log(' To generate a new character supply data in the following format: \n');
    console.log('   node rollchar.js "Name" "Biography" Gender Race Homeworld Profession "save_to_file.json" \n');
    console.log(' Example:\n node rollchar.js "Medb Hedtsky" "Excellent deductionist though close-minded, kind to animals." Intersex Human Imperial Psyker "my_psyker.json"\n'); 
    console.log('  * Please use quotations when entering information that includes one or more spaces.\n');
    console.log(' To load a saved character: \n');
    console.log('   node rollchar.js load "filename.json" ');
    
    console.log(' To repeat this message use \'/?\' or \'help\'');  
   
} else if ( process.argv[2] === 'load' ) {
// Load character using "node rollchar.js load 'filename'"

    var filePath = './vault/' + process.argv[3];

    if ( filePath.indexOf('.json') === -1 ) {
        filePath = filePath + '.json';
    }
    
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


} else if ( process.argv[2] === 'list' ) {

    var fs = require('fs');
    
    console.log('\n Listing contents of character vault:\n');
    
    fs.readdir('./vault', function (err, list) {
        list.forEach( function( file ) {
            console.log('\t' + file);
        })
    })

} else {
// run rollchar.js with normal character generating arguments & function

// user input
    var name = process.argv[2];
    var bio = process.argv[3];
    var gender =  process.argv[4].capitalize(); 
    var race = process.argv[5].capitalize();
    var homeworld = process.argv[6].capitalize();
    var career = process.argv[7].capitalize();
    var saveFilePath = process.argv[8];

    //var skills = process.argv[8];
    //var inv = process.argv[9];
    var skills = {
        //Language: "Low Gothic",
        // ForbiddenKnowledge: "The art, knowledge and status of a great tea brewer.",
        // Driving: "Land; Adept at driving simple land vehicles. +5 Modifier."
    };
    var inv = {
        //SlugPistol: {
        //    Ammo: 0,
            // Damage: 6 + 1
        //},
        // Lhosticks: 4,
        //CorpseRations: 5,
        //Charm: "A smooth pebble polished by the abrasive winds of the desert, is tied like a pet on leash with a length of greasy rope. Goes by name of Br. Blockford"
    };

    main()
}

function main() {
    
//    Generate a character and store the object in 'character'
///////////////////////////////////////////////////////////////////////////////
      
    var character = generateNewChar(
        name, 
        bio, 
        gender, 
        race, 
        homeworld, 
        career, 
        skills, 
        inv, 
        handleGeneratedChar // trigger callback function
    );

    // Callback for generateNewChar
    function handleGeneratedChar(err, character) {

        if ( err ) {
            console.error('There was an error: ', err);
        } 
        
        // Log the Character Information to stdout (console.log)
        displayChar(
            character,
            function doneDisplaying(err, character){
                if ( err ) {
                    console.error('There was an error: ', err);
            } 
        });
        
        return character;
    }



    //  Add character object to charVault[] to store in memory
    ///////////////////////////////////////////////////////////////////////////
    
    /*
    charVault.push(character);
    charVault.push(character);

    function checkVault(slot){
        for ( slot in charVault ) {
            if ( slot instanceof Object ) {
                console.log('Slot '+ charVault.indexOf( slot ) + ' of charVault: ' + 
                character['name'] + ', a ' + character.race + ' of ' +  
                character.homeworld + ' lineage.' );
            }
        }
    }
    charVault.forEach(checkVault);

    //console.log(charVault);
    
    */

    ///////////////////////////////////////////////////////////////////////////
    //
    //    Save Character Object To File
    //
    ///////////////////////////////////////////////////////////////////////////

    // callback function for saveChar
    function doneSaving(err, path, savedData) {
        if ( err ) {
            console.error('There was an error saving the file: ', err);
        }
        
        console.log('Character stored in charVault slot 0 now saving to file: ' +  path );
        
    }

    if ( saveFilePath === undefined ) {
      // If nothing was passed save it anyway
      
        saveFilePath = './vault/' + character.name + '.json';
        
        saveChar(
            saveFilePath, 
            character, // charVault[0], 
            doneSaving // triggers callback function
        );        

    } else if ( saveFilePath.indexOf('.json') !== -1 ) {  // false if no match
    // If user supplied a file path with '.json' in it, saves to user specified
    
        
        saveFilePath = './vault/' + saveFilePath;
    
        saveChar(
            saveFilePath, 
            character, //charVault[0], 
            doneSaving // triggers callback function
        );
        
    } else { // if no '.json' is found in the user specified file path, add it
        // this assumes that they have only entered a file name
        saveFilePath = './vault/' + saveFilePath + '.json';
        
        saveChar(
            saveFilePath, 
            character, //charVault[0], 
            doneSaving // triggers callback function
        );        
    }
}
