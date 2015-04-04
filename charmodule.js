
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
    prof, 
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


// This is set to the Dark Heresy dice roll rules for selecting a random homeworld
    function getHomeworld(homeworld) {
      
        if (homeworld === "random") {
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

        }
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
    character.profession = prof;
    character.skills = skills;
    character.inventory = inv;
    
    
    function generateStats(character){
        
        var homeworld = character.homeworld;
        if (homeworld === "Feral") {
            character.characteristics.WS = d20(20);
            character.characteristics.BS = d20(20);
            character.characteristics.S = d20(25);
            character.characteristics.T = d20(25);
            character.characteristics.Ag = d20(20);
            character.characteristics.Int = d20(20);
            character.characteristics.Per = d20(20);
            character.characteristics.WP = d20(15);
            character.characteristics.Fel= d20(15);
        } else if (homeworld === "Hive") {
            character.characteristics.WS = d20(20);
            character.characteristics.BS = d20(20);
            character.characteristics.S = d20(20);
            character.characteristics.T = d20(15);
            character.characteristics.Ag = d20(20);
            character.characteristics.Int = d20(20);
            character.characteristics.Per = d20(20);
            character.characteristics.WP = d20(20);
            character.characteristics.Fel= d20(25);
        }else if (homeworld === "Imperial") {
            character.characteristics.WS = d20(20);
            character.characteristics.BS = d20(20);
            character.characteristics.S = d20(20);
            character.characteristics.T = d20(20);
            character.characteristics.Ag = d20(20);
            character.characteristics.Int = d20(20);
            character.characteristics.Per = d20(20);
            character.characteristics.WP = d20(20);
            character.characteristics.Fel= d20(20);
        }else if (homeworld === "Voidborn") {
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
