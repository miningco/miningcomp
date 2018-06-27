import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const PayoutList = (props) => (
    <List title="Miner Payouts" {...props} perPage={25}>
        <Datagrid>
            <TextField source="txHash" sortable={false} href="https://www.etherchain.org/account/0x0e1f151967ee6cc11613ab101f4090fd67f6b8b4" />
            <TextField source="paidOn" sortable={false} />
            <TextField source="amount" sortable={false} />
            <TextField source="start" sortable={false} />
            <TextField source="end" sortable={false} />
        </Datagrid>
    </List>
);
