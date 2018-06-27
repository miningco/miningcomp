import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import MinerPayoutWidgetContainer from './MinerPayoutWidgetContainer';
import SharesWidgetContainer from './SharesWidgetContainer';
import CoinContainer from './CoinPrice/CoinContainer';
import CurrentStatsContainer from './CurrentStatsContainer';

// Add in styles
import '../styles/Dashboard.css';

export default () => (
  <Card>
    <CardHeader title="Welcome to the administration" />

    <Grid container spacing={8}>
      <Grid item xs={12} sm={6}>
        {/* AJ | Added a new widget container to fetch payout data from
        etherum api for give minerId (as props) and then use the same data
        to create a line chart */}
        <MinerPayoutWidgetContainer
          minerId={'0x0e1f151967ee6cc11613ab101f4090fd67f6b8b4'}
          heading="Miner Payouts"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SharesWidgetContainer
          minerId={'0x0e1f151967ee6cc11613ab101f4090fd67f6b8b4'}
          heading="Miner Shares"

        />
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <div style={{ padding: 8 }}>
          <CoinContainer />
        </div>
      </Grid>
      <Grid item xs={12} sm={9}>
        <div style={{ padding: 8 }}>
          <CurrentStatsContainer
            minerId={'0x0e1f151967ee6cc11613ab101f4090fd67f6b8b4'}
          />
        </div>
      </Grid>
    </Grid>
  </Card>

);
