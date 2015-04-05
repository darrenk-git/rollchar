
/* 
A. 
  1. Generate new character object from following arguments;
      Name, Bio, Gender, Race, Homeworld, Profession, Skills, Inventory
  2. Return Character Object().
*/

module.exports = function(
    name, 
    bio, 
    gender, 
    race, 
    homeworld, 
    career, 
    skills, 
    inv, 
    callback
){
   
// Different Dice Rolls
    var rollD = function(x) {
         return Math.floor(Math.random()*x+1);
    }
    var d20 = function(x) {
        return Math.floor(Math.random()*20+x+1);
    }
    var d100 = function(x) {
        return Math.floor(Math.random()*100+x+1);
    }

    // initialize new character for testing purposes
    var character = {
        name: "",
        biography: "",
        gender: "",
        race: "",
        homeworld: "",
        characteristics:{
            WS: 0,
            BS: 0,
            S: 0,
            T: 0,
            Ag: 0,
            Int: 0,
            Per: 0,
            WP: 0,
            Fel: 0,
        },
        inventory: {
            Ammo: 0,
            Lhosticks: 4,
            CorpseRations: 5,
            Charm: "Something charming"
            },
        skills: {
            Language: "Low Gothic",
            Drive: "Land Vehicle",
            Armor: "Light Armor",
            Training: "Basic Balistic Weapons"
        },
        subplot: "Subplot",
        insanity: 0,
        corruption: 0
    }
     
      
    character.name = name;
    character.biography = bio;
    character.gender = gender;
    character.race = race;
    character.homeworld = getHomeworld(homeworld);
    character.career = getCareer(career, character.homeworld);
    character.skills = skills;
    character.inventory = inv;
    
    // This is set to the Dark Heresy dice roll rules for selecting a random homeworld
    function getHomeworld(homeworld) {
      
        if ( homeworld.toLowerCase() === "random" || homeworld === "r" ) {
            var randomWorld = rollD(100);
            //console.log(randomWorld);
            //randomWorld;
            if (randomWorld <= 20){
                homeworld = "Feral";
            }else if(randomWorld >= 21 && randomWorld <= 45){
                homeworld = "Hive";
            }else if(randomWorld >= 46 && randomWorld <= 90){
                homeworld = "Imperial";
            }else if(randomWorld >= 91 && randomWorld <= 100){
                homeworld = "Voidborn";
            }
        
        return homeworld;

        } else {
        return homeworld; 
        }
    }

    // This is to set Character career. Random generation depends on homeworld
    function getCareer(career, homeworld) {
      
        if ( career.toLowerCase() === "random" ) {
            var rCareer = rollD(100);
            
            if ( homeworld === 'Feral' ){
                if ( rCareer >= 1 && rCareer <= 30 ){ 
                    career = 'Assassin';
                } else if (rCareer >= 31 && rCareer <= 80 ){ 
                    career = 'Guardsman';
                } else if (rCareer >= 81 && rCareer <= 90 ){ 
                    career = 'Imperial Psyker';
                } else if (rCareer >= 91 && rCareer <= 100 ){ 
                    career = 'Scum';
                } 
            } else if ( homeworld === 'Hive' ) {
                if (rCareer >= 1 && rCareer <= 17 ){ //
                    career = 'Arbitrator';
                } else if (rCareer >= 18 && rCareer <= 20 ){ //
                    career = 'Assassin';
                } else if (rCareer >= 21 && rCareer <= 25 ){ //
                    career = 'Cleric';
                } else if (rCareer >= 26 && rCareer <= 35 ){ //
                    career = 'Gaurdsman';
                } else if (rCareer >= 36 && rCareer <= 40 ){ //
                    career = 'Imperial Psyker';
                } else if (rCareer >= 41 && rCareer <= 89 ){ //
                    career = 'Scum';
                } else if (rCareer >= 90 && rCareer <= 100 ){ //
                    career = 'Tech-Priest';
                }
            } else if ( homeworld === 'Imperial' ) {
                if (rCareer >= 1 && rCareer <= 12 ){ //
                    career = 'Adept';
                } else if (rCareer >= 13 && rCareer <= 25 ){ //
                    career = 'Arbitrator';
                } else if (rCareer >= 26 && rCareer <= 38 ){ //
                    career = 'Assassin';
                } else if (rCareer >= 39 && rCareer <= 52 ){ //
                    career = 'Cleric';
                } else if (rCareer >= 53 && rCareer <= 65 ){ //
                    career = 'Gaurdsman';
                } else if (rCareer >= 66 && rCareer <= 79 ){ //
                    career = 'Imperial Psyker';
                } else if (rCareer >= 80 && rCareer <= 90 ){ //
                    career = 'Scum';
                } else if (rCareer >= 91 && rCareer <= 100 ){ //
                    career = 'Tech-Priest';
                }
            } else if ( homeworld === 'Voidborn' ) {
                if (rCareer >= 1 && rCareer <= 10 ){ //
                    career = 'Adept';
                } else if (rCareer >= 11 && rCareer <= 20 ){ //
                    career = 'Arbitrator';
                } else if (rCareer >= 21 && rCareer <= 25 ){ //
                    career = 'Assassin';
                } else if (rCareer >= 26 && rCareer <= 35 ){ //
                    career = 'Cleric';
                } else if (rCareer >= 36 && rCareer <= 75 ){ //
                    career = 'Imperial Psyker';
                } else if (rCareer >= 76 && rCareer <= 85 ){ //
                    career = 'Scum';
                } else if (rCareer >= 86 && rCareer <= 100 ){ //
                    career = 'Tech-Priest';
                } 
            }
        
            return career; 
        } else {
            return career; 
        }
      
    }
    
    function generateStats(character){
        
        var homeworld = character.homeworld.toLowerCase();
        
        if (homeworld === "feral") {
            character.characteristics.WS = d20(20);
            character.characteristics.BS = d20(20);
            character.characteristics.S = d20(25);
            character.characteristics.T = d20(25);
            character.characteristics.Ag = d20(20);
            character.characteristics.Int = d20(20);
            character.characteristics.Per = d20(20);
            character.characteristics.WP = d20(15);
            character.characteristics.Fel= d20(15);
        } else if (homeworld === "hive") {
            character.characteristics.WS = d20(20);
            character.characteristics.BS = d20(20);
            character.characteristics.S = d20(20);
            character.characteristics.T = d20(15);
            character.characteristics.Ag = d20(20);
            character.characteristics.Int = d20(20);
            character.characteristics.Per = d20(20);
            character.characteristics.WP = d20(20);
            character.characteristics.Fel= d20(25);
        }else if (homeworld === "imperial") {
            character.characteristics.WS = d20(20);
            character.characteristics.BS = d20(20);
            character.characteristics.S = d20(20);
            character.characteristics.T = d20(20);
            character.characteristics.Ag = d20(20);
            character.characteristics.Int = d20(20);
            character.characteristics.Per = d20(20);
            character.characteristics.WP = d20(20);
            character.characteristics.Fel= d20(20);
        }else if (homeworld === "voidborn") {
            character.characteristics.WS = d20(20);
            character.characteristics.BS = d20(20);
            character.characteristics.S = d20(15);
            character.characteristics.T = d20(20);
            character.characteristics.Ag = d20(20);
            character.characteristics.Int = d20(20);
            character.characteristics.Per = d20(20);
            character.characteristics.WP = d20(25);
            character.characteristics.Fel= d20(20);
            }
        
        return character.characteristics;
    }
    
    generateStats(character);
    
        
    return callback(null, character);

}
