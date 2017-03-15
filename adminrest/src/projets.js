import React from 'react';
import { Filter, List, Datagrid, DateField, TextField, TextInput } from 'admin-on-rest/lib/mui';

const ProjectFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)

export const ProjetList = (props) => (
    <List title="Projets" {...props} filters={<ProjectFilter />}>
        <Datagrid>
            {/*<TextField source="id_projet" />*/}
            <TextField source="Nom" />
            <TextField source="DateDebut" />
            <TextField source="DateFin" />
            <TextField source="IdentifiantMinos" />
            <TextField source="IdentifiantHermes" />
            <TextField source="Adm" />
            <TextField source="id_Client" />
        </Datagrid>
    </List>
);
