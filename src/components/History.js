import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const HistoryList = (props) => (
    <List title="HashRate List" {...props} perPage={250}>
        <Datagrid>
            <TextField source="time" sortable={false} />
            <TextField source="reportedHashrate" sortable={false} />
            <TextField source="currentHashrate" sortable={false} />
            <TextField source="validShares" sortable={false} />
            <TextField source="invalidShares" sortable={false} />
            <TextField source="activeWorkers" sortable={false} />
        </Datagrid>
    </List>
);
