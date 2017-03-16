import React from 'react';

// import { connect } from 'react-redux';
// to manage List views
import { List, Datagrid, DateField, TextField, NumberField, ReferenceField } from 'admin-on-rest/lib/mui';
import { Filter } from 'admin-on-rest/lib/mui'

// to manage Edit form
import {
    Edit, Create, EditButton, DisabledInput, LongTextInput,
    ReferenceInput, SelectInput, SimpleForm,
    TextInput, DateInput, NumberInput
} from 'admin-on-rest/lib/mui';


export const AffectationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            {/*<TextInput source="id_Consultant" />*/}
            <ReferenceInput label="Consultant" source="id_Consultant" reference="consultants" allowEmpty>
                <SelectInput optionText="Nom" />
            </ReferenceInput>
            {/*<TextInput source="id_Projet" />*/}
            <ReferenceInput label="Projet" source="id_Projet" reference="projets" allowEmpty>
                <SelectInput optionText="Nom" />
            </ReferenceInput>
            <TextInput source="Pourcentage" defaultValue={100} />
            <DateInput source="DateDebut" defaultValue={new Date()} />
            <DateInput source="DateFin" />
        </SimpleForm>
    </Create>
);

const AffectationFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)

// TODO: Reference should be automatically fetched
// for the moment it reqired a loading by a click on Projects and Consultants

export const AffectationList = (props) => (
    <List title="Affectations" {...props} filters={<AffectationFilter />}>
        <Datagrid>
            <TextField label="IAff" source="id" />
            <TextField label="ICons" source="id_Consultant" />
            <ReferenceField label="Consultants" source="id_Consultant" reference="consultants" allowEmpty>
                <TextField source="Nom" />
            </ReferenceField>
            <TextField label="IProj" source="id_Projet" />
            <ReferenceField label="Projets" source="id_Projet" reference="projets" allowEmpty>
                <TextField source="Nom" />
            </ReferenceField>
            <TextField source="" />
            {/*<NumberField source="Pourcentage" options={{ style: 'percent' }} />*/}
            <DateField source="DateDebut" />
            <DateField source="DateFin" />
            <EditButton />
        </Datagrid>
    </List>
);



export const AffectationEdit = (props) => (
    <Edit title="Affectation" {...props}>
        <SimpleForm>
            <DisabledInput label="id_Affectation" source="id" />
            <TextInput source="id_Consultant" />
            <ReferenceInput label="Consultant" source="id_Consultant" reference="consultants" allowEmpty>
                <SelectInput optionText="Nom" />
            </ReferenceInput>
            <TextInput source="id_Projet" />
            <ReferenceInput label="Projet" source="id_Projet" reference="projets" allowEmpty>
                <SelectInput optionText="Nom" />
            </ReferenceInput>
            <TextInput source="Pourcentage" />
            {/*<NumberInput source="Pourcentage" options={{ style: 'percent' }} />*/}
            <DateInput source="DateDebut" />
            <DateInput source="DateFin" />
        </SimpleForm>
    </Edit>
);



