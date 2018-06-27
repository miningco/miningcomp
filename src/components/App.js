
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
// import { PostList } from './Posts';
import { PayoutList } from './Payouts';
import { WorkerList } from './Workers';
import { HistoryList } from './History';
import Dashboard from './Dashboard';
import AuthProvider from './AuthProvider';
import DataProvider from './DataProvider';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import './app.css';

// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
    <Admin
        title="Mining Tracker"
        dashboard={Dashboard}
        authProvider={AuthProvider}
        dataProvider={DataProvider}
      >
        {/* <Resource name="posts" list={PostList} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} /> */}
        <Resource
            name="payouts"
            list={PayoutList}
            icon={PostIcon}
        />
        <Resource
            name="workers"
            list={WorkerList}
            icon={UserIcon}
        />
        <Resource
            name="history"
            list={HistoryList}
            icon={PostIcon}
        />
    </Admin>
);

export default App;
