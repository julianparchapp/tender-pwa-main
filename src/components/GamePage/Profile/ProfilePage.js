import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@mui/styles';
import SwipeableViews from 'react-swipeable-views';
import ImageGroup from '../../../images/GrupoExample.svg';
import FooterNavigation from '../../../shared-components/FooterNavigation';
import { getProfileGroup } from '../../../store/app/groupUserSlice';
import ProfileInterests from './ProfileInterests';
import ProfileGroup from './ProfileGroup';

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.boxPadding} id="item1">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    width: '100%',
    // boxShadow: '0 0 #fff !important',
  },
  appBar: {
    background: '#FFF !important',
    boxShadow: '0 0 #fff !important',
  },
  bottonLabel: {
    fontSize: '0.8rem !important',
    '&.Mui-selected': {
      color: '#051B34 !important',
    },
  },
  boxPadding: {
    padding: '3px !important',
  },
  indicator: {
    backgroundColor: '#051B34 !important',
  },
}));

const ProfilePage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { profileGroup } = useSelector(({ groupUser }) => groupUser);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    dispatch(getProfileGroup());
  }, [dispatch]);

  return (
    <div className="w-full h-full relative" style={{ background: '#FFF' }}>
      <div
        className="w-full pt-8 mb-4"
        style={{ background: '#051B34', height: '180px', borderRadius: '0px 0px 20px 20px' }}
      >
        <h3 className="font-700 text-center block mb-8" style={{ color: '#FFF' }}>
          Editar perfil
        </h3>

        <div className="w-full flex flex-col justify-center items-center space-x-8 text-center">
          {/* <div className="w-40 h-40 rounded-full border-2 border-white shadow-lg overflow-hidden"> */}
          {/*  <img */}
          {/*    src={profileGroup?.photos[1]?.url || ImageGroup} */}
          {/*    alt="img-profile" */}
          {/*    className="block w-max h-full object-cover" */}
          {/*  /> */}
          {/* </div> */}
          <div className="w-56 h-56 rounded-full border-2 border-white shadow-lg overflow-hidden">
            <img
              src={profileGroup?.photos[0]?.url || ImageGroup}
              alt="img-profile"
              className="block w-max h-full object-cover"
            />
          </div>
          <h3 className="font-700 text-center block pt-4" style={{ color: '#FFF', margin: '0px' }}>
            {profileGroup?.name}
          </h3>
          {/* <div className="w-40 h-40 rounded-full border-2 border-white shadow-lg overflow-hidden"> */}
          {/*  <img */}
          {/*    src={profileGroup?.photos[2]?.url || ImageGroup} */}
          {/*    alt="img-profile" */}
          {/*    className="block w-max h-full object-cover" */}
          {/*  /> */}
          {/* </div> */}
        </div>
      </div>
      {/* HEIGHT: 64px(nav bottom) + 150(top componet) */}
      <div className="mx-auto" style={{ width: '90%', height: '100%', marginBottom: '64px' }}>
        <div className="w-full flex flex-col space-y-8">
          <div className={classes.root} id="div1">
            <AppBar position="static" color="default" className={classes.appBar} id="div2">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="full width tabs example"
                textColor="inherit"
                classes={{
                  indicator: classes.indicator,
                }}
              >
                id="div3" >
                <Tab
                  label="Editar Perfil"
                  className={classes.bottonLabel}
                  {...a11yProps(0)}
                  {...a11yProps(0)}
                  id="div4"
                />
                <Tab
                  label="Editar Intereses"
                  className={classes.bottonLabel}
                  {...a11yProps(1)}
                  id="div5"
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme?.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme?.direction}>
                <ProfileGroup profileGroup={profileGroup} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme?.direction}>
                <ProfileInterests profileGroup={profileGroup} />
              </TabPanel>
            </SwipeableViews>
          </div>
        </div>
      </div>
      <FooterNavigation currentPage="profile" />
    </div>
  );
};

export default ProfilePage;
