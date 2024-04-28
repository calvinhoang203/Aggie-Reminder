## Procedures on how to run the program

1.) Open your terminal/commandprompt and make sure you have **nodejs** installed. To do this you can go to the website **https://nodejs.org/en** and download node.js. For mac users you can also use a package manager like Homebrew. If you have homebrew then you can type in the command **brew install node** and brew will install node.js

2.) In the terminal, type **npm install <package_name>** to install nodejs project manager packages which is essential to running the program correctly. You can verify if you have it installed by typing in **npm -v** which gives you the version of the npm you have currently installed.

3.) Once you have downloaded the folder from Github. Navigate to the folder of HACKDAVIS2024 and search for the file called **server.js**

4.) Open the file and navigate to line 9 which says **const filePath = ''; // Updated file path** add the file path of the excel worksheet that you want to work with in between the quotes. 

5.) If you have those things completed then you are ready to run the program. Open your terminal/command prompt and make sure you are in the directory where **server.js** is. To know your current directory, type in **pwd** and it will display what directory are you currently in.

6.) Inorder for you to run the program you have to type in **node server.js** 

Once it runs it should display something like this:
**[nodemon] starting `node server.js`
listening on port 3000......**

7.) Go to your web browser and type in **localhost:3000** and voila you are currently running the program!

8.) If you are an admin and would want to send out reminders to the volunteers regarding their shifts. You can do this by signing in to your email 


**Notes: Please have an API key for this to work. You can get one for free in Sendgrid API.**

Instruction on installing PostgreSQL:
- Download PostgreSQL:
  - Go to the official PostgreSQL website: https://www.postgresql.org/download/
  - Select your operating system (Windows, macOS, or Linux) and click on the corresponding download link.
  - Follow the on-screen instructions to download the PostgreSQL installer.
- Install PostgreSQL:
  - Once the installer is downloaded, run it to start the installation process.
  - Follow the installation wizard instructions, choosing the default options unless you have specific preferences.
  - During the installation, you will be prompted to set a password for the default PostgreSQL user (postgres). Make sure to remember this password as you'll need it later.
- Verify Installation:
  - After the installation is complete, you can verify that PostgreSQL is installed correctly by opening a command prompt (Windows) or terminal (macOS/Linux) and running the     following command: psql --version
  - This command should display the installed version of PostgreSQL, confirming that the installation was successful.
- Start PostgreSQL Service:
  - PostgreSQL may not start automatically after installation. You may need to start the PostgreSQL service manually.
  - On Windows, you can start the PostgreSQL service by searching for "Services" in the Start menu, locating the "PostgreSQL Database Server" service, and starting it.
  - On macOS/Linux, you can start the PostgreSQL service using the following command in the terminal: sudo service postgresql start
- Access PostgreSQL Shell (psql):
  - Once PostgreSQL is installed and running, you can access the PostgreSQL command-line interface (CLI) called psql.
  - On Windows, you can open the psql shell by searching for "pgAdmin" in the Start menu and selecting the appropriate option.
  - On macOS/Linux, you can open the psql shell by opening a terminal and running the following command: psql -U postgres
  - You will be prompted to enter the password you set during installation.
- Create a Database:
  - Once you're in the psql shell, you can create your own database by running the following SQL command: CREATE DATABASE your_database_name;
  - Replace your_database_name with the desired name for your database.
  - You should see a confirmation message indicating that the database was created successfully.
- Verify Database Creation:
  - To verify that the database was created successfully, you can list all databases using the following command: \l
  - This will display a list of all databases, including the one you just created.
- Connect to Your Database:
  - To connect to the database you created, you can use the following command: \c <your_database_name>
  - This will connect you to the specified database, allowing you to start working with it.
