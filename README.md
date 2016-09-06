GameStats:
This application reads a list of games & displays it to the user in a responsive, easily
sortable table form.
The list is held at a remote server and is fetched in a json format

Structure: 
The application has been developed using HMVC CodeIgniter. 

Models Directory: application/models

Modules Directory: application/modules
	a)Currently only 1 module: "global"

Controller Directory: application/modules/global/controllers

Views Directory: application/modules/global/views/

Tests Directory: application/tests

	  
Configs Directory: application/configs/

Library Directory: application/libraries/

Helpers Directory: application/helpers/

JS & CSS files: Assets
	a)CSS    : assets/styles
	b)JS     : assets/scripts
	c)images : assets/images


How To Run:
1. Add hosts entry for "ishangamestats.local"

2. Create Database: 
	a)Schema Name: "ishangamestats_dev"
	b)Host		:   "localhost"
	c)Uname 	:	"root"
	d)Password  :	"root"
	
3. Import the sql files in the "database" folder:
	a) ci-sessions    : required for any CI app
	
4. Copy the entire directory the root of the server. 

5. Goto: "http://ishangamestats.local"
	a) You will see the home page. Click on "Enter Site" button.