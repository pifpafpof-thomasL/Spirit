import React from 'react';
import { List, Datagrid, DateField, TextField, Edit, EditButton, SimpleForm, DisabledInput } from 'admin-on-rest/lib/mui';

// filters
import { Filter, TextInput, ReferenceInput, SelectInput, DateInput, NumberInput } from 'admin-on-rest/lib/mui'

const ProjectFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)

export const ProjectList = (props) => (
    <List title="Projets" {...props} filters={<ProjectFilter />}>
        <Datagrid>
            {/*<TextField source="id_projet" />*/}
            <TextField source="Nom" />
            <TextField source="DateDebut" type="date" />
            <TextField source="DateFin" />
            <TextField source="IdentifiantMinos" />
            <TextField source="IdentifiantHermes" />
            <TextField source="Adm" />
            <TextField source="id_Client" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProjectEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="Nom" />
            <DateInput source="DateDebut" />
            <DateInput source="DateFin" />
            <TextInput source="IdentifiantMinos" />
            <TextInput source="IdentifiantHermes" />
            <TextInput source="Adm" />
            <TextInput source="id_Client" />
        </SimpleForm>
    </Edit>
);
