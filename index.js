import express from 'express';
import { members } from './data/members.js';
import { services } from './data/servicesData.js';
import { students } from './data/students.js';
const app = express();
const port = 3000;


app.get('/', (request, response) => {
  return response.send('Home page');
})

app.get('/about', (request, response) => {
    return response.send('About page ');
  })
app.get('/services', (request, response) => {
  return response.send('Services page ');
})  
app.get('/services/:servicesName', (request, response) => {
    if (services.includes(request.params.servicesName)) {
    return response.send(`Services ${request.params.servicesName} inner page ...`);
};
    return response.send('Services- 404, not found ... ');
}) 

app.get('/services/:serviceName/members', (req, res) => {
    if (services.includes(req.params.serviceName)) {
        return res.send(`Paslaugos "${req.params.serviceName}" nariu sarasas...`);
    }

    return res.send('Services page: such service is not recognized...');
});

app.get('/services/:serviceName/members/:memberName', (req, res) => {
    const { serviceName, memberName } = req.params;

    if (!services.includes(serviceName)) {
        return res.send('Services page: such service is not recognized...');
    }

    if (!members.includes(memberName)) {
        return res.send(`Paslaugoje "${serviceName}" nario "${memberName}" nepavyko rasti...`);
    }

    return res.send(`Paslaugos "${serviceName}" nario "${memberName}" informacija...`);
});


app.get('/team', (request, response) => {
    return response.send('Team page');
})

app.get('/team/:name', (request, response) => {
    
    if(members.includes(request.params.name)) {
        return response.send(`Team member `+ request.params.name + ` page`
    );}
    

    return response.send(`Team member `+ request.params.name + ` not found`
    );
}) 


app.get('/img', (req, res) => {
    return res.send('Images...');
});

app.get('/img/logo.png', (req, res) => {
    return res.send('Images: logo.png turinys :P');
});

app.get('/nuolaidos', (req, res) => {
    return res.send('Nuolaidu puslapis');
});

app.get('/nuolaidos/vasaros-nuolaida', (req, res) => {
    return res.send('Vasaros nuolaidos puslapis');
});

app.get('/nuolaidos/rudens-nuolaida', (req, res) => {
    return res.send('Rudens nuolaidos puslapis');
});

app.get('/nuolaidos/ziemos-nuolaida', (req, res) => {
    return res.send('Ziemos nuolaidos puslapis');
});

app.get('/nuolaidos/pavasario-nuolaida', (req, res) => {
    return res.send('Pavasario nuolaidos puslapis');
});

app.get('/nuolaidos/*', (req, res) => {
    return res.send('Gaila, bet tokia nuolaida neveikia');
});



app.get('/students', (req, res) => {
    let names = [];
    for (const [student, value] of Object.entries(students)) {
        names.push(value.name);
    }
    names = names.join(', ');
    const lastIr = names.lastIndexOf(',')
    names = names.slice(0, lastIr) + ' ir ' + names.slice(names.lastIndexOf(',') + 1);
    return res.send(`Mokosi ${Object.keys(students).length} studentai: ${names}`);
   
});



app.get('/students/:studentName', (req, res) => {
    if (Object.keys(students).includes(req.params.studentName.toLowerCase())) {
        const studentsParams = students[req.params.studentName.toLowerCase()];
        return res.send(`Studentas, vardu ${studentsParams.name} yra ${studentsParams.age} metu amziaus ir yra ${studentsParams.isMarried ? "" : "ne "} vedes.`)
    }
    return res.send(`Studento, vardu ${req.params.studentName} nera.`);
})


app.get('*', (req, res) => {
    return res.send('Ups... 404 page 🛸');
});

app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
});



/*

/students
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