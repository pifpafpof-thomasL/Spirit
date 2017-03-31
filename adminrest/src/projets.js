import React from 'react';
import { List, Datagrid, DateField, TextField, Edit, EditButton, SimpleForm, DisabledInput } from 'admin-on-rest/lib/mui';

// filters
import {
    Filter, TextInput, ReferenceInput, ReferenceManyField, ChipField, SingleFieldList,
    SelectInput, DateInput, NumberInput
} from 'admin-on-rest/lib/mui'

const ProjetFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)

export const ProjetList = (props) => (
    <List title="Projets" {...props} filters={<ProjetFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="Nom" />
            <DateField source="DateDebut" />
            <DateField source="DateFin" />
            {/*<ReferenceManyField label="Consultants" reference="consultants">*/}
            {/*<SingleFieldList>*/}
            {/*<ChipField label="Projet" source="Nom" />*/}
            {/*</SingleFieldList>*/}
            {/*</ReferenceManyField>*/}

            <TextField source="id_Client" />
            <EditButton />
        </Datagrid>
    </List>
);

const ProjetTitle = ({ record }) => {
    return <span>Projet {record ? `"${record.Nom}"` : ''}</span>;
};

export const ProjetEdit = (props) => (
    <Edit title={<ProjetTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="Nom" />
            <DateInput source="DateDebut" />
            <DateInput source="DateFin" />
            <TextInput source="id_Client" />
        </SimpleForm>
    </Edit>
);
