
import express from 'express';
import { servicesData } from '../data/servicesData.js';
import { members } from '../data/members.js';

export const serviceMembersRouter = express.Router({mergeParams:true,});

serviceMembersRouter.get('/', (req, res) => {
    if (servicesData.includes(req.params.serviceName)) {
        return res.send(`Paslaugos "${req.params.serviceName}" nariu sarasas...`);
    }

    return res.send('Services page: such service is not recognized...');
});

serviceMembersRouter.get('/:memberName', (req, res) => {
    const { serviceName, memberName } = req.params;
    console.log(req.params);

    if (!servicesData.includes(serviceName)) {
        return res.send('Services page: such service is not recognized...');
    }

    if (!members.includes(memberName)) {
        return res.send(`Paslaugoje "${serviceName}" nario "${memberName}" nepavyko rasti...`);
    }

    return res.send(`Paslaugos "${serviceName}" nario "${memberName}" informacija...`);
});
