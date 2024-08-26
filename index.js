import express from 'express';
import { servicesRouter } from './router/servicesRouter.js';
import { teamRouter } from './router/teamRouter.js';
import { discountRouter } from './router/discountRouter.js';
import { studentsRouter } from './router/studentsRouter.js';
import { booksRouter } from './router/booksRouter.js';
import { phonesRouter } from './router/phonesRouter.js';
import { apiRouter } from './router/apiRouter.js';



const app = express();
const port = 3000;

app.use(express.json()) 
// for parsing application/json
app.use(express.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    return res.send('Home page');
});

app.get('/about', (req, res) => {
    return res.send('About page');
});

app.get('/img', (req, res) => {
    return res.send('Images...');
});

app.get('/img/logo.png', (req, res) => {
    return res.send('Images: logo.png turinys :P');
});

app.use('/services', servicesRouter);
app.use('/team', teamRouter);
app.use('/discount', discountRouter);
app.use('/students', studentsRouter);
app.use('/books', booksRouter);
app.use('/phones', phonesRouter);
app.use('/api',apiRouter);

app.get('*', (req, res) => {
    return res.send('Ups... 404 page 🛸');
});

app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
});

/*

/students
Mokosi 1 studentai: Ona.
Mokosi 2 studentai: Petras ir Ona.
Mokosi 3 studentai: Maryte, Petras ir Ona.
Mokosi 4 studentai: Jonas, Maryte, Petras ir Ona.

/students/jonas
/students/Jonas
/students/JoNas
/students/JONAS
Studentas, vardu Jonas yra 99 metu amziaus ir yra vedes.

/students/chuck
Studento, vardu chuck nera.

/students/Chuck
Studento, vardu Chuck nera.

*/



// app.get('/students', (req, res) => {
//     let names = [];
//     for (const [student, value] of Object.entries(students)) {
//         names.push(value.name);
//     }
//     names = names.join(', ');
//     const lastIr = names.lastIndexOf(',')
//     names = names.slice(0, lastIr) + ' ir ' + names.slice(names.lastIndexOf(',') + 1);
//     return res.send(`Mokosi ${Object.keys(students).length} studentai: ${names}`);
   
// });



// app.get('/students/:studentName', (req, res) => {
//     if (Object.keys(students).includes(req.params.studentName.toLowerCase())) {
//         const studentsParams = students[req.params.studentName.toLowerCase()];
//         return res.send(`Studentas, vardu ${studentsParams.name} yra ${studentsParams.age} metu amziaus ir yra ${studentsParams.isMarried ? "" : "ne "} vedes.`)
//     }
//     return res.send(`Studento, vardu ${req.params.studentName} nera.`);
// })
