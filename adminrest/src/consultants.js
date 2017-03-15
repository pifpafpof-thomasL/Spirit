import React from 'react';

// to manage List views
import { List, Datagrid, DateField, TextField, EmailField, ReferenceField, ReferenceManyField, SingleFieldList, ChipField } from 'admin-on-rest/lib/mui';

// to filter
import { Filter } from 'admin-on-rest/lib/mui'

// to manage Edit form
import { Edit, EditButton, DisabledInput, LongTextInput, 
    ReferenceInput, SelectInput, SimpleForm,
    TextInput, DateInput, NumberInput
} from 'admin-on-rest/lib/mui';


const ConsultantFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)

export const ConsultantList = (props) => (
    <List title="Consultants" {...props} filters={<ConsultantFilter />}>
        <Datagrid>
            {/*//<TextField source="id" />*/}
            <TextField source="Prenom" />
            <TextField source="Nom" />
            {/*<EmailField source="Email" />*/}
            {/*<TextField source="login" />*/}
            {/*<TextField source="TelPortable" />*/}
            {/*<TextField source="TelFixe" />*/}
            <DateField source="DateNaissance" />
            {/*<DateField source="DateEntreeEntreprise" />*/}
            <TextField source="CoutJournalier" />
            {/*<ReferenceManyField label="Maitrises" reference="maitrises">
                <SingleFieldList>
                    <ChipField source="Niveau" />
                </SingleFieldList>
            </ReferenceManyField>*/}
            {/*<ReferenceField label="Maitrise" source="Maitrise" reference="consultants">
                <TextField source="Niveau" />
            </ReferenceField>*/}
            <EditButton />   
               {/* to display an Edit button */}
        </Datagrid>
    </List>
);


const ConsultantTitle = ({ record }) => {
    return <span>Consultant {record ? `"${record.Prenom} ${record.Nom}"` : ''}</span>;
};

export const ConsultantEdit = (props) => (
    <Edit title={<ConsultantTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="Prenom" />
            <TextInput source="Nom" />
            <TextInput source="Email" />
            <TextInput source="login" />
            <TextInput source="TelPortable" />
            <TextInput source="TelFixe" />
            <DateInput source="DateNaissance" />
            <DateInput source="DateEntreeEntreprise" />
            <NumberInput source="CoutJournalier" />
            {/*<ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>*/}
            {/*<TextField source="id_Statut" />*/}
        </SimpleForm>
    </Edit>
);
/*
export const ConsultantCreate = (props) => (
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


