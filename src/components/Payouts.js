import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const PayoutList = (props) => (
    <List title="Miner Payouts" {...props} perPage={25}>
        <Datagrid>
            <TextField source="txHash" sortable={false} />
            <TextField source="paidOn" sortable={false} />
            <TextField source="amount" sortable={false} />
            <TextField source="start" sortable={false} />
            <TextField source="end" sortable={false} />
        </Datagrid>
    </List>
);
