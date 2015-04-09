
/* 
A. 
  1. Generate new character object from following arguments;
      Name, Homeworld-Type, Career
  2. Return Character Object().
*/

module.exports = function(
    name, 
    //gender, 
    //race, 
    homeworld, 
    career, 
    //skills, 
    //inv, 
    //bio, 
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
        traits: {
        },
        talents: {
        },
        subplot: "Subplot",
        insanity: 0,
        corruption: 0
    }
     
    var traits = {};
    var talents = {};
    var skills = {};
    var inv = {};
    
    character.name = getName(name);
    //character.biography = bio;
    //character.gender = gender;
    //character.race = race;
    character.homeworld = getHomeworld(homeworld);
    character.career = getCareer(career, character.homeworld);
    character.traits = getTraits(traits, character.homeworld, character.career);
    character.skills = getSkills(skills, character.homeworld, character.career);
    character.talents = getTalents(talents, character.career);
    character.inventory = inv;
    character.characteristics = generateStats(character);
    
    function getName(name) {
        if ( name === 'random' ) {
            //generate random name
            name = rollD(1000)
                          .toString()
                          .capitalize();
            return name;
        } else {
            return name;
        }
    }
    
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

    
    function getTraits(traits, homeworld, career) {
        var hw = homeworld.toLowerCase();
        var c = career.toLowerCase();
        
        if ( hw === 'feral') {

            traits[ 'Iron Stomach' ] = 'Benefit: +10 to Carouse Skill Tests made to resist effects of ingested toxins, poisin or tainted foods.';
            traits.Primitive = 'Penalty: You take a -10 penalty on Tech-Use (Int) Tests and a -10 penalty to Fellowship Tests made in formal or civilised surroundings.';
            
        } else if ( hw === 'hive') {
          
            traits[ 'Accustomed to Crowds' ] = 'Benefit: Crowds to not count as Difficult Terrain for hivers, and when Running or Charging through a dense crowd, hivers take no penalty to the Agility Test to keep their feet.';
            traits[ 'Caves of Steel' ] = 'Benifit: Hivers treat the Tech-Use (Int) skills as a Basic Skill.';
            traits.Hivebound = 'Penalty: Hivers take a -10 penalty to all Survival (Int) Tests, and while out of a \'proper hab\' (e.g. places without manufactured goods, solid ceilings and electrical power) the hiver takes a -5 penalty to all Intelligence Tests.';
            traits.Wary = 'Benifit: All hivers gain a +1 bonus to Initiative rolls.';
            
        } else if ( hw === 'imperial') {
          
            traits[ 'Blessed Ignorance' ] = 'Penalty: Your wise blindness imposes a -5 penalty on Forbidden Lore (Int) Tests.';
            traits[ 'Hagiography' ] = 'Benifit: Imperial worlders treat the Common Lore (Imperial Creed) (Int), Common Lore (Imperium) (Int) and Common Lore (War) (Int) skills as Basic Skills.';
            traits[ 'Liturgical Familiarity' ] = 'Benefit: Imperial world characters treat Literacy (Int) and Speak Language (High Gothic) (Int) as Basic Skills.';
            traits[ 'Superior Origins' ] = 'Benefit: Increased your Willpower by +3.';
            
        } else if ( hw === 'voidborn') {
            traits[ 'Charmed' ] = 'Benefit: Whenever you spend a Fate Point (though not if you burn one), roll a 1d10. On the roll of a natural 9, you do not lose the Fate Point.';
            traits[ 'Ill-Omened' ] = 'Penalty: You take a -5 penalty on all Fellowship Tests made to interact with non-void born humans.';
            traits[ 'Shipwise' ] = 'Benefit: Navigation (Stellar) (Int) and Pilot (Spacecraft) (Ag) are Basic Skills for you.';
            traits[ 'Void Accustomed' ] = 'Benefit: You are immune to space travel sickness. In addition, zero- or low-gravity environments are not considered Difficult Terrain for you.';
        }
        
        if ( c === 'tech-priest' ) {
            traits[ 'Mechanicus Implants' ] = '';
        }
        
        
        return traits;
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
                    career = 'Guardsman';
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
                    career = 'Guardsman';
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
    
    function getSkills(skills, homeworld, career) {
        var hw = homeworld.toLowerCase();
        var c = career.toLowerCase();
        
        if ( hw === 'feral') {

            skills[ 'Speak Language (Tribal Dialect) (Int)' ] = 'All feral worlders can converse in their regional tongue, unique to their world of origin.';
            skills[ '' ] = '';
            skills[ '' ] = '';
            
        } else if ( hw === 'hive') {
          
            skills[ 'Speak Language (Hive Dialect) (Int)' ] = 'All hive worlders can converse in the common cant of their home, each one unique to their hive of origin.';
            skills[ 'Tech-Use (Int) (Basic)' ] = 'To a hiver, surrounded at all times by metal, machinery and industry, the arcane mysteries of technology are not so strange.';
            
        } else if ( hw === 'imperial') {
 
            skills[ 'Speak Language (High Gothic) (Int)' ] = ''; 
            skills[ 'Common Lore (Imperial Creed) (Int)' ] = '';
            skills[ 'Common Lore (Imperium) (Int)' ] = '';
            skills[ 'Common Lore (War) (Int)' ] = '';
            
            
        } else if ( hw === 'voidborn') {
            
            skills[ 'Speak Language (Ship Dialect) (Int)' ] = ''; 
            skills[ 'Navigation (Stellar) (Int) (Basic)' ] = '';
            skills[ 'Pilot (Spacecraft) (Ag) (Basic)' ] = '';
            skills[ '' ] = '';
            
        }
        
        if ( c === 'adept') {
            
            skills[ 'Speak Language (Low Gothic) (Int)' ] = '';
            skills[ 'Literacy (Int)' ] = '';
            
            var rSkill = rollD(10);
            if ( rSkill >= 1 && rSkill <= 5 ) {
                skills[ 'Trade (Copyist) (Int)' ] = '';
            } else if( rSkill >= 6 && rSkill <= 10 ) {
                skills[ 'Trade (Valet) (Fel)' ] = '';
            }
            
            skills[ 'Common Lore (Imperium) (Int)' ] = '';
            
            rSkill = rollD(10);
            if ( rSkill>= 1 && rSkill <= 5 ) {
                skills[ 'Scholastic Lore (Legend) (Int)' ] = '';
            } else if( rSkill >= 6 && rSkill <= 10 ) {
                skills[ 'Common Lore (Tech) (Int)' ] = '';
            }
            
            
        } else if ( c === 'arbitrator') {
            
            skills[ 'Speak Language (Low Gothic) (Int)' ] = '';
            skills[ 'Literacy (Int)' ] = '';
            skills[ 'Common Lore (Adeptus Arbites) (Int)' ] = '';
            skills[ 'Common Lore (Imperium) (Int)' ] = '';
            skills[ 'Inqury (Fel)' ] = '';
            
        } else if ( c === 'assassin') {
            
            skills[ 'Speak Language (Low Gothic) (Int)' ] = '';
            skills[ 'Awareness (Per)' ] = '';
            skills[ 'Dodge (Ag)' ] = '';
            
        } else if ( c === 'cleric') {
            
            skills[ 'Speak Language (Low Gothic) (Int)' ] = '';
            skills[ 'Common Lore (Imperial Creed) (Int)' ] = '';
            skills[ 'Literacy (Int)' ] = '';
            
            var rSkill = rollD(10);
            if ( rSkill>= 1 && rSkill <= 5 ) {
                skills[ 'Performer (Singer) (Fel)' ] = '';
            } else if( rSkill >= 6 && rSkill <= 10 ) {
                skills[ 'Trade (Copyist) (Int)' ] = '';
            }
            
            rSkill = rollD(10);
            if ( rSkill>= 1 && rSkill <= 5 ) {
                skills[ 'Trade (Cook) (Int)' ] = '';
            } else if( rSkill >= 6 && rSkill <= 10 ) {
                skills[ 'Trade (Valet) (Fel)' ] = '';
            }
            
        } else if ( c === 'guardsman') {
            
            skills[ 'Speak Language (Low Gothic) (Int)' ] = '';
            
            var rSkill = rollD(10);
            if ( rSkill>= 1 && rSkill <= 5 ) {
                skills[ 'Drive (Ground Vehicle) (Ag)' ] = '';
            } else if( rSkill >= 6 && rSkill <= 10 ) {
                skills[ 'Swim (S)' ] = '';
            }
            
        } else if ( c === 'imperial psyker') {
            
            skills[ 'Speak Language (Low Gothic) (Int)' ] = '';
            skills[ 'Psyniscience (Per)' ] = '';
            skills[ 'Invocation(WP)' ] = '';
            
            var rSkill = rollD(10);
            if ( rSkill>= 1 && rSkill <= 5 ) {
                skills[ 'Trade (Merchant) (Fel)' ] = '';
            } else if( rSkill >= 6 && rSkill <= 10 ) {
                skills[ 'Trade (Soothsayer) (Fel)' ] = '';
            }
            
            skills[ 'Literacy (Int)' ] = '';
            
        } else if ( c === 'scum') {
            
            skills[ 'Speak Language (Low Gothic) (Int)' ] = '';
            skills[ 'Blather (Fel)' ] = '';
            
            var rSkill = rollD(10);
            if ( rSkill>= 1 && rSkill <= 5 ) {
                skills[ 'Charm (Fel)' ] = '';
            } else if( rSkill >= 6 && rSkill <= 10 ) {
                skills[ 'Dodge (Ag)' ] = '';
            }
            
            skills[ 'Decieve (Fel)' ] = '';
            skills[ 'Awareness (Per)' ] = '';
            skills[ 'Common Lore (Imperium) (Int)' ] = '';
            
        } else if ( c === 'tech-priest') {
            
            skills[ 'Speak Language (Low Gothic) (Int)' ] = '';
            skills[ 'Tech-Use (Int)' ] = '';
            skills[ 'Literacy (Int)' ] = '';
            skills[ 'Secret Tongue (Tech) (Int)' ] = '';
            
            var rSkill = rollD(10);
            if ( rSkill>= 1 && rSkill <= 5 ) {
                skills[ 'Trade (Scrimshawer) (Ag)' ] = '';
            } else if( rSkill >= 6 && rSkill <= 10 ) {
                skills[ 'Trade (Copyist) (Int)' ] = '';
            }
            
            
        } 
        
        
        
      
        return skills;
    }
    
    
    function getTalents(talents, career) {
        // Talents are often assigned by choice.
        // I have given each binary choice 50% randomness
        
        var c = career.toLowerCase();
        
        if ( c === 'adept') {
            
            var rTalent = rollD(10); 
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Melee Weapon Training (Primitive)' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Pistol Training (SP)' ] = '';
            }
            
            rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Light Sleeper' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Resistance (Cold)' ] = '';
            }
            
            rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Sprint' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Unremarkable' ] = '';
            }
            
        } else if ( c === 'arbitrator') {
            
            talents[ 'Basic Weapons Training (SP)' ] = '';
            talents[ 'Melee Weapon Training (Primitive)' ] = '';
            
            var rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Quick Draw' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Rapid Reload' ] = '';
            }
            
        } else if ( c === 'assassin') {
            
            talents[ 'Melee Weapon Training (Primitive)' ] = '';
                        
            var rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Ambidextrous' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Unremarkable' ] = '';
            }
            
            rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Thrown Weapon Training' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Pistol Training (Las)' ] = '';
            }
            
            talents[ 'Basic Weapon Training (SP)' ] = '';
            talents[ 'Pistol Training (SP)' ] = '';
            
        } else if ( c === 'cleric') {
            
            talents[ 'Melee Weapon Training (Primitive)' ] = '';
            talents[ 'Pistol Training (SP)' ] = '';
            
            rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Basic Weapon Training (Primitive)' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Thrown Weapon Training (Primitive)' ] = '';
            }
            
        } else if ( c === 'guardsman') {
            
            talents[ 'Melee Weapon Training (Primitive)' ] = '';
            
            var rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Pistol Training (Primitive)' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Pistol Training (Las)' ] = '';
            }
            
            talents[ 'Basic Weapons Training (Las)' ] = '';
            
            rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Basic Weapon Training (Primitive)' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Basic Weapons Training (SP)' ] = '';
            }
            
        } else if ( c === 'imperial psyker') {
            
            talents[ 'Melee Weapon Training (Primitive)' ] = '';
            
            var rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Pistol Training (SP)' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Pistol Training (Las)' ] = '';
            }
            
            talents[ 'Psy Rating 1' ] = 1;
            
        } else if ( c === 'scum') {
            
            var rTalent = rollD(10);
            if ( rTalent >= 1 && rTalent <= 5 ) {
                talents[ 'Ambidextrous' ] = '';
            } else if( rTalent >= 6 && rTalent <= 10 ) {
                talents[ 'Unremarkable' ] = '';
            }
            
            talents[ 'Melee Weapon Training (Primitive)' ] = '';
            talents[ 'Pistol Training (SP)' ] = '';
            talents[ 'Basic Weapons Training (SP)' ] = '';
            
        } else if ( c === 'tech-priest') {
            
            talents[ 'Melee Weapon Training (Primitive)' ] = '';
            talents[ 'Basic Weapons Training (Las)' ] = '';
            talents[ 'Pistol Training (Las)' ] = '';
            talents[ 'Electro Graft Use' ] = '';
            
        }     
    
        return talents;
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
            character.characteristics.WP = d20(20) + 3; // from trait Superior Origins
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
    
    //generateStats(character);
    
        
    return callback(null, character);

}
