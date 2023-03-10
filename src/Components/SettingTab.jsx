import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import candle from '../image/candle.svg'
import { CandleSetting } from './SettingComponents/candleSetting';
import { ApparenaceSetting } from './SettingComponents/appearanceSetting';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{flexBasis:'40%'}}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab icon={<img src={candle} className='svg_size'/>} iconPosition="start" label={<p>Symbol</p>} {...a11yProps(0)} />
        <Tab icon={<img src={candle} className='svg_size'/>} iconPosition="start" label={<p>Apparenace</p>} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CandleSetting/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ApparenaceSetting/>
      </TabPanel>
      </Box>
  );
}
