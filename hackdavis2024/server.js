const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const xlsx = require('xlsx');
const cors = require('cors');
const app = express();

// Change this file path relevent to your local address
const filePath = 'C:\\Users\\minhk\\OneDrive\\Documents\\Desktop\\Hack-Davis-main\\Hack-Davis-main\\hackdavis2024\\Test Calendar 2024.xlsx'; // Updated file path

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const sgMail = require('@sendgrid/mail');

// Ensure to replace with your actual SendGrid API key
const API_KEY = ''; 
sgMail.setApiKey(API_KEY);

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '2002',
        database: 'hackdavis2024'
    }
})


let intialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})



app.get('/api/shifts', (req, res) => {
    try {
        console.log('Attempting to read Excel file from:', filePath);
        const shifts = readExcelData(filePath);
        console.log('Data read successfully:', shifts);
        res.json(shifts);
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).send('Error processing Excel file');
    }
});

function readExcelData(filePath) {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        return xlsx.utils.sheet_to_json(worksheet);
    } catch (error) {
        console.error('Failed to read Excel file:', error);
        throw error; // Rethrow the error to be caught in the endpoint
    }
}

app.post('/send-custom-reminders', (req, res) => {
    const { message, subject, recipients } = req.body;
    const contactInfo = readExcelData(filePath, 1); // 1 is typically the index for the second sheet
    
    let emailsToSend = [];

    if (recipients === 'all') {
        emailsToSend = contactInfo.map(item => item.email);  // Adjust 'email' if the column name is different
    } else {
        // For individual or selected emails, parse the recipients field
        emailsToSend = recipients.split(',').map(email => email.trim());
    }

    emailsToSend.forEach(email => {
        sendReminderEmail(email, subject, message);
    });

    res.send('Emails sent successfully');
});


function sendReminderEmail(to, subject, text) {
    const msg = {
        to: to,
        from:'aggiehouseschedules@gmail.com',  // This should be a verified sender
        subject: subject,
        text: text,
    };

    sgMail.send(msg)
        .then(() => console.log('Email sent successfully to', to))
        .catch((error) => console.error('Error sending email:', error));
}

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})




