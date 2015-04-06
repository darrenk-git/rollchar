//
//    Displays the details of the passed character object in the console (stdout)
//

module.exports = function(character, callback) {
  
    function logObjectProps(obj) {
        
        var list = [];
      
        for (var prop in obj) {
            
            if ( obj.hasOwnProperty( prop ) ) {
            
                if (prop === 'SlugPistol'){
                                      
                    list.push( '\t\t\t' +prop + ": ");
                    for( var prop2 in obj['SlugPistol'] ) {
                      
                        if( obj[prop].hasOwnProperty( prop2 ) ) {
                          
                          //console.log( prop2 + ": " + prop[prop2]);   
                          list.push( '\t\t\t\t> ' + prop2 + ": " + obj[prop][prop2] );
                        
                        }
                    }
                /*}  else if (prop === 'characteristics') {
                                      
                    list.push( '   ' + prop + ": ");
                    for( var prop2 in obj['characteristics'] ) {
                      
                        if( obj[prop].hasOwnProperty( prop2 ) ) {
                          
                          list.push( '   > ' + prop2 + ": " + obj[prop][prop2] );
                        
                        }
                    } */
                } else if ( obj  === character.traits ) {
                  
                    list.push( '\t\t' + prop /*+ ":\n" + obj[prop]*/ );
                
                } else if ( obj  === character.talents ) {
                  
                    list.push( '\t\t' + prop /*+ ":\n" + obj[prop]*/ );
                
                } else if ( obj  === character.skills ) {
                  
                    list.push( '\t\t' + prop /*+ ":\n" + obj[prop]*/ );
                
                } else if ( !(prop instanceof Object) ){

                    //console.log( prop + ": " + obj[prop]);
                    list.push( '\t\t' + prop + ":\t" + obj[prop] );

                  
                }
            }
        }
        
        return list;
    
    }
    
    console.log('\n------------------------------- Character Sheet --------------------------------');
    
    console.log('\tName: \t\t' + character.name);
    console.log('\tBiography: \t' + character.biography);
    //console.log('\tGender: \t' + character.gender);
    //console.log('\tRace: \t\t' + character.race);
      
    /* String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    }
    
    console.log(' Homeworld: \t' + character.homeworld.capitalize()); */
    console.log('\tHomeworld: \t' + character.homeworld);
    console.log('\tCareer: \t' + character.career);
    
    /*
    
    console.log('\n\t Inventory: \n');
    var invList = logObjectProps(character.inventory);
    console.log(invList.join('\n').toString());
    */
    
    console.log('\n\tCharacteristics \n');
    var statList = logObjectProps(character.characteristics);
    console.log(statList.join('\n').toString());
    
    console.log('\n\tTraits \n');
    var traitsList = logObjectProps(character.traits);
    console.log(traitsList.join('\n').toString());
    
    console.log('\n\t Skills: \n');
    var skillsList = logObjectProps(character.skills);
    console.log(skillsList.join('\n').toString());
    
    console.log('\n\tTalents \n');
    var talentsList = logObjectProps(character.talents);
    console.log(talentsList.join('\n').toString());
    
    console.log('\n--------------------------------------------------------------------------------');
    
    return callback(null, character);
}
