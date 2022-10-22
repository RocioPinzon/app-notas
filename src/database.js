const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://rpinzon:samoloPerra01@cluster0.gyhgoyq.mongodb.net/db-gesterr?retryWrites=true&w=majority';
//mongoose.connect();
//mongoose.connect('mongodb://localhost/notes-db-app',

mongoose.connect(dbUrl,
{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
})
.then(db => {
    console.log('DB is connected')
    
        
})
.catch(err => console.log(err));

/*
{
    {Employeeid: 1; EmployeeName: Guru99};
    {Employeeid: 2; EmployeeName: Joe};
    {Employeeid: 3; EmployeeName: Martin};
}*/