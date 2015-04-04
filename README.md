# rollchar
A simple node.js character generator to quickly roll up a basic Dark Heresy character.
Why? I'm a fan of the game and felt I could contribute to those among us who need to roll up a new character but don't have an hour to spare!

## Usage

In it's current form this little program runs from the command line.
This requires Node.js to run so head over to nodejs.org and hit install if you wish to try this out.

To generate a new character supply information as the following parameters of rollchar.js:
```
  node rollchar.js "Name" "Biography" Gender Race Homeworld Profession "save_to_file.json"
```  
The file is saved in the 'vault' folder.
To load a saved character use rollchar.js with the load command and a file name like this:
```
  node rollchar.js load "filename.json"
```
## Example:

You type the following into your command line:
```
  node rollchar.js "Medb Hedtsky" "Excellent deductionist though close-minded, migraine prone, kind to animals." Intersex Human Imperial Psyker "my_psyker.json"
```
A file named 'my_psycker.json' will be created in the './vault' directory. To display the character data again simply run:
```
  node rollchar.js load "my_psyker.json"
```
Note:
Please use quotations when entering information that includes one or more spaces to the same variable. You can see this in the example, first and last name as well as the biography are within quotation marks.
For help type:
  node rollchar.js help

## License & Terms of use

I created this program as a fan of the Dark Heresy role playing game, for fans of Dark Heresy to use.
You are free to use, view and modify this program and it's source code for your own righteous ends.
If you redistribute this or anything made from this please link back to my github account or website.
If you wish to use my code for commercial purposes please contact me before doing so. You can e-mail me through github.

Dark Heresy is owned and licensed by Fantasy Flight Games and all respective rights reserved by their respective owners.
I have no affiliation with Fantasy Flight Games or Games Workshop, however I encourage you to check out Dark Heresy for much fun times!
