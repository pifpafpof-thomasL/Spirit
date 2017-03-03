import React from 'react';
import { List, Datagrid, DateField, TextField } from 'admin-on-rest/lib/mui';

export const ProjetList = (props) => (
    <List title="Projets" {...props}>
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
