import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';

import useStyles from './styles';


// urlSearchParams helps us know what page we are on and what search term we are looking for. We can use it as a hook 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  // query is where we are getting our page info from
  const query = useQuery();
  const history = useHistory();
  // reads our URL and sees if we have a page parameter in there. If so, it populates the page variable. Else, if we dont have the page, we must be on the first one
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    //trim just makes sure there are no empty spaces
    if(search.trim() || tags) {
      // dispatch -> fetch search post
      //we join them with a comma just incase we have an array we can turn things into a string, which lets us easily pass data from front to backend.
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));

      //Client Side Routing: this will send users to the correct URL after they have searched for a tag or memory.
      //the search is coming from state, we use 'none' string if there is no search, the & symbol adds the tags. We use the ',' because we have to split then join again.
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      //we redirect back because we've searched for nothing
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    //keyCode 13 is the Enter key
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit" >
              <TextField 
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                // this allows us to change the value of the search
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput 
                style={{ margin: '10px 0'}}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {( !searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
