import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const WorkerList = (props) => (
    <List title="Worker List" {...props} perPage={25}>
        <Datagrid>
            <TextField source="worker" sortable={false} />
            <TextField source="time" sortable={false} />
            <TextField source="lastSeen" sortable={false} />
            <TextField source="currentHashrate" sortable={false} />
            <TextField source="validShares" sortable={false} />
            <TextField source="averageHashrate" sortable={false} />
        </Datagrid>
    </List>
);
