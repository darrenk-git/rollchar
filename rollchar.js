
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
if ( process.argv[2] === '-h' || process.argv[2] === '--help' || process.argv[2] === '/?' ) {
    console.log('--------------------------------------------------------------------------------')
    console.log(' rollchar - A Dark Heresy Character Generator \n');
    console.log(' 1. To roll a new character enter data in correct sequence seperated by spaces: \n');
    console.log('   "Name" "Biography" Homeworld-Type Career "save_file_name.json" \n');
    console.log(' Homeworld types are:');
    console.log('\t' + 'Feral');
    console.log('\t' + 'Imperial');
    console.log('\t' + 'Hive');
    console.log('\t' + 'Voidborn');
    console.log('\t' + 'random' );
    console.log(' Career types are:');
    console.log('\t' + 'Adept');
    console.log('\t' + 'Arbitrator');
    console.log('\t' + 'Assassin');
    console.log('\t' + 'Cleric');
    console.log('\t' + 'Guardsman');
    console.log('\t' + 'Imperial Psyker');
    console.log('\t' + 'Scum');
    console.log('\t' + 'Tech-Priest' + '\n');
    console.log('\t' + 'random' + '\n');
    console.log(' 2. Load and display a saved character: \n');
    console.log('   node rollchar.js --load "filename.json" \n\n');
    console.log(' 3. List saved characters: \n');
    console.log('   node rollchar.js --list \n');
    console.log('\n Use example:\n\n node rollchar.js "Medb Hedtsky" Voidborn "Imperial Psyker" "my psyker.json"\n'); 
    console.log('  * Please use quotations when entering information that includes any spaces.\n');
    
    console.log(' To repeat this message use \'/?\', \'-h\' or \'--help\' \n');
    console.log('--------------------------------------------------------------------------------')

// Load character using "node rollchar.js --load 'filename'"    
} else if ( process.argv[2] === '--load' || process.argv[2] === '-l') {

    var filePath = process.argv[3];
    if ( filePath.indexOf('./vault') === -1 ) {
        filePath = './vault/' + filePath;
    }
    
    if ( filePath.indexOf('.json') === -1 ) {
        filePath = filePath + '.json';
    }
    
    character = loadChar( filePath, displayOnLoad);

    function displayOnLoad(err, charData) {
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


} else if (  process.argv[2] === '-ls' || process.argv[2] === '--list' ) {
// list characters in character vault
    var fs = require('fs');
    
    console.log('\n Listing contents of character vault:\n');
    
    fs.readdir('./vault', function (err, list) {
        if (list.length >= 1) {
            list.forEach( function( file ) {
                console.log('\t' + file);
            })
        } else {
            console.log('\t Vault is empty');
        }
    })

} else if ( process.argv[2] === undefined && process.argv.length <= 2 ) {
  
///////////////////////////////////////////////////////////////////////////////  
// run rollchar.js with random parameters 
///////////////////////////////////////////////////////////////////////////////
// user input
///////////////////////////////////////////////////////////////////////////////
    var name = 'random'; //random name
    var homeworld = 'random'; // random homeworld
    var career = 'random' // random career
    var saveFilePath = undefined;
    //var bio = process.argv[6];

    //var skills = process.argv[8];
    //var inv = process.argv[9];
    //var skills = {}
    //var inv = {
        //SlugPistol: {
        //    Ammo: 0,
        //    Damage: rollD(10)+2
        //},
        // Lhosticks: 4,
        //CorpseRations: 5,
        //Charm: "A smooth pebble polished by the abrasive winds of the desert, is tied like a pet on leash with a length of greasy rope. Goes by name of Br. Blockford"
    //};

    main()
  

} else {

///////////////////////////////////////////////////////////////////////////////  
// run rollchar.js with normal character generating arguments & function
///////////////////////////////////////////////////////////////////////////////
// user input
///////////////////////////////////////////////////////////////////////////////
    var name = process.argv[2];
    //var gender =  process.argv[4].capitalize(); 
    //var race = process.argv[5].capitalize();
    var homeworld = process.argv[3].capitalize();
    var career = process.argv[4].capitalize();
    var saveFilePath = process.argv[5];
    //var bio = process.argv[6];

    //var skills = process.argv[8];
    //var inv = process.argv[9];
    //var skills = {}
    //var inv = {
        //SlugPistol: {
        //    Ammo: 0,
        //    Damage: rollD(10)+2
        //},
        // Lhosticks: 4,
        //CorpseRations: 5,
        //Charm: "A smooth pebble polished by the abrasive winds of the desert, is tied like a pet on leash with a length of greasy rope. Goes by name of Br. Blockford"
    //};

    main()
}

function main() {
    
//    Generate a character and store the object in 'character'
///////////////////////////////////////////////////////////////////////////////
      
    var character = generateNewChar(
        name, 
        //gender, 
        //race, 
        homeworld, 
        career, 
        //skills, 
        //inv, 
        //bio, 
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
        
        saveCharNow( character );
        
        return character;
    }
  
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
        
        console.log( 'Character saved to file: ' +  path );
        console.log( 'Access by using:\n\t< node rollchar.js load \"' + path + '\" >' );
        console.log( 'Or use\n\t< node rollchar.js list > to list all saved files.' );
        
    }
    
    function saveCharNow(character) {
        if ( saveFilePath === undefined && name === 'random' ) {
        // random name & no save file name, generate name.
            character.name = character.homeworld + ' '
                       + character.career + ' '
                       + character.name; 
                       // character.name is a random number, see charmodule.js
        
            saveFilePath = './vault/' + character.name + '.json';
            
            saveChar(
                saveFilePath, 
                character, 
                doneSaving // triggers callback function
            );   
        
        } else if ( saveFilePath === undefined ) {
          // If nothing was passed save it anyway
          
            saveFilePath = './vault/' + character.name + '.json';
            
            saveChar(
                saveFilePath, 
                character, 
                doneSaving // triggers callback function
            );        

        } else if ( saveFilePath.indexOf('.json') !== -1 ) {  // false if no match
        // If user supplied a file path with '.json' in it, saves to user specified
        
            
            saveFilePath = './vault/' + saveFilePath;
        
            saveChar(
                saveFilePath, 
                character,
                doneSaving // triggers callback function
            );
            
        } else { // if no '.json' is found in the user specified file path, add it
            // this assumes that they have only entered a file name
            saveFilePath = './vault/' + saveFilePath + '.json';
            
            saveChar(
                saveFilePath, 
                character, 
                doneSaving // triggers callback function
            );        
        }
    }
    
    
}
