import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddPostCard from '../AddPostCard/AddPostCard';
import FilteredCard from '../FeedCard/FilteredCard';
import { useDispatch, useSelector } from 'react-redux';
import "../styles.css"
import ProfileAlbum from '../ProfileAlbum/ProfileAlbum';
import ExploreL from '../ExploreCard/ExploreL';

import { Accordion, Card, Button } from 'react-bootstrap';
import { getSinglePlaceDetails } from '../../store/Actions/explore';
import ProfileFavList from '../ProfileFavList/ProfileFavList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop:"-6rem",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProfileTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const currentUser = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.post.allPosts);
  const favourites = useSelector((state) => state.like.favourite);
  const details = useSelector((state) => state.explore.singleResult.result);
  console.log(favourites,"the fav")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const params = props.props.match.params.id
  const dispatch = useDispatch()
  const getDetails = (id) => {
    dispatch(getSinglePlaceDetails(id))
  }
  console.log(details ? details : "errror","the details from the place")
console.log(params,"the params")
  return (
    <div className={classes.root}>
      <AppBar className="profile-tab" position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Posts" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Pictures" href="/trash" {...a11yProps(1)} />
          {params === "me" ? <LinkTab label="My favourites" href="/spam" {...a11yProps(2)} /> : null}
        </Tabs>
      </AppBar>
      <TabPanel className="tab-page" value={value} index={0}>
       <FilteredCard params={params}/>
      </TabPanel>
      <TabPanel  className="tab-page" value={value} index={1}>
        <ProfileAlbum parmas={params}/>
      </TabPanel>
      {params === "me" ?<TabPanel className="tab-page" value={value} index={2}>
        {/* <Accordion>
        {favourites.map((fav,i) => 
        (
  <Card>
    <Card.Header>
      <Accordion.Toggle onClick={() => getDetails(fav.placeId)} as={Button} variant="link" eventKey={i}>
        Click me!{i}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={i}>
      <Card.Body>{details ? details.name : null}</Card.Body>
    </Accordion.Collapse>
  </Card>
        ))}
        </Accordion> */}
        <ProfileFavList />
      </TabPanel> : null}
      
    </div>
  );
}