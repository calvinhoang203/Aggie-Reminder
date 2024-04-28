We use Google Apps Script, a free application development platform, to create an algorithm to send automated reminders to volunteers about their shifts.

How to use it:

1/ Download the formatted Google Sheet file in the folder.
2/ Open it in Google Sheet in your browser.
3/ Add in whatever emails you want to send in the row next to existed email.
4/ Click on the Extentions -> Apps Script.
5/ On the left side of the website, go the <> Editor.
6/ Click on the Code.gs
7/ Copy the code in the automated_reminder.txt in the folder and paste in Code.gs.
8/ On the left side of the website, go to Triggers -> Add Trigger (It's on the bottom right corner of the website)
9/ Click on the select event source and change the option to "Time-driven"
10/ Click on the select type of time based trigger and change the option to "Day timer"
11/ Click on the select time of day and change the option to whatever time you want to remind the volunteers.
12/ Press Save and it will automatically send the reminders to the emails that were put in the Google Sheets.

Notes: If you want to manually have the emails sent right away, go back to Code.gs and run the whole code.

Done!