import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/posts';

import useStyles from './styles'

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
 
  //this is run everytime the page changes. If there is a page, then dispatch getPosts action. 
  //we want to pass a page to it so that it only fetches the post from that specific page
  useEffect(() => {
    if (page) { 
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination 
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;