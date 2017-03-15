import React from 'react';

import { connect } from 'react-redux';
// to manage List views
import { List, Datagrid, DateField, TextField, EmailField } from 'admin-on-rest/lib/mui';

// to manage Edit form
import { Edit, EditButton, DisabledInput, LongTextInput, 
    ReferenceInput, SelectInput, SimpleForm,
    TextInput, DateInput, NumberInput
} from 'admin-on-rest/lib/mui';

export const AffectationList = (props) => (
    <List tie="Affectations" {...props}>
        <Datagrid>
            {/*//<TextField source="id" />*/}
            <NumberField source="id_Consultant" />
            <NumberField source="id_Projet" />
            <NumberField source="Pourcentage" />
            <NumberField source="DateDebut" />
            <DateField source="DateFin" />
            <EditButton />    {/* to display an Edit button */}
        </Datagrid>
    </List>
);

/*
const AffectationTitle = ({ record }) => {
    return <span>Affectation {record ? `"${record.Prenom} ${record.Nom}"` : ''}</span>;
};

export const AffectationEdit = connect(state => ({affectations: state.admin.affectations ? state.admin.affectations.data : null}))((props) => (
    <Edit title={<AffectationTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="Prenom" />
            <TextInput source="Nom" />
            <TextInput source="Email" />
            <TextInput source="login" />
        </SimpleForm>
        
    </Edit>
));
*/
/*
export const AffectationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);
*/


