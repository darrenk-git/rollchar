# rollchar
A fan-made node.js character generator to quickly roll up a basic Dark Heresy character.
Why? I've enjoyed playing the game and this project exists to teach myself programming. I also felt like contributing to those among us who need to roll up a new character but don't have an hour to spare!

## Usage

In it's current form this little program runs from the command line.
This requires Node.js to run so head over to nodejs.org and hit install if you wish to try this out.

This is the format to run rollchar:

```
  node rollchar.js [options]
```
To generate a new random character simply run the following without any options. For everything that's available to you see below:


| Options | Description |
| ------------- | ------------- |
| ["Name"] ["Homeworld-Type"] ["Career"]  | This passes your character name, homeworld type and career options to the generator.|
| -h, --help, help or /?   | Displays the help menu.  |
| -ls, --list  | Displays a list of characters from the vault directory. |
| -l, --load [ filename ] | Loads and displays the given file name.  |
| --help homeworld | Displays the valid homeworld types.  |
| --help career | Displays the valid career types.  |

Rollchar.js uses a space to seperate each option. Please insert quotations around values that contain spaces, e.g. the career "Imperial Psyker". 

Homeworld-Type determines your characters' base characteristics. It can be set to 'random' or one of 4 homeworld types specified in the Core Rulebook - Feral, Imperial, Hive or Voidborn.
Careers, when generated randomly, are picked from a pool of careers specific to the characters' homeworld type as defined in the Dark Heresy core rulebook.

When a new character is generated, it is displayed and saved in the 'vault' folder.

To list saved characters type:

```
  node rollchar.js --list
```

To load a saved character use rollchar.js with the load command and a file name like this:

```
  node rollchar.js --load "filename.json"
```

### Usage example:

Let's roll up a new character. To do so we open our command-line interface (e.g. Command Prompt on windows) and make sure your current working directory is set to the rollchar directory. (On windows you can use the 'dir' command to list files and folders, and the 'cd' command to change directory.)
Now type the following into your command line:

```
  node rollchar.js "Medb Hedtsky" Voidborn "Imperial Psyker" "my_psyker.json"
```

A character will be generated and a file named 'my_psyker.json' created within the './vault' directory.
To display this character data again type:

```
  node rollchar.js --load "my_psyker.json"
```

Note:
Please use quotations when entering information that includes one or more spaces to the same variable. You can see this in the example, first and last name are within quotation marks.

For help type:
```
  node rollchar.js --help
```
### License & Terms of use

I created this program as a fan of the Dark Heresy role playing game, for fans of Dark Heresy to use.
You are free to use, view and modify this program and it's source code for your own righteous ends.
If you redistribute this or anything made from this please link back to my github account or website.
If you wish to use my code for commercial purposes please contact me before doing so. You can e-mail me through github.

Dark Heresy is owned by Fantasy Flight Games, who retain all respective rights to Dark Heresy. All rights reserved by their respective owners.
I have no affiliation with Fantasy Flight Games or Games Workshop, however I encourage you to check out Dark Heresy for much fun times!

### Next steps

I am currently developing this into a little web app for those of us who prefer to click things. :)