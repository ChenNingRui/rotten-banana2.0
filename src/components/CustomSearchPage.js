import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
    List,
    ListItem,
} from '@material-ui/core/';

import TMBDAxios from '../api/TMBD/TMBDAxios';
import useFetch from '../api/UseFetch';
import config from '../api/TMBD/Config';
import CustomListItem from '../components/CustomListItem';
import storage from '../Storage';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CustomSearchPage(props) {
    let classes = useStyles();
    let [query, setQuery] = useState(props.location.state.query);
    let [movies, setMovies] = useState([]);
    let favoriteList = useRef([]);
    let url = '/search/movie?api_key=' + config.API_KEY + '&query=' + query + '&language=en-US&page=1&include_adult=false';

    let { response, isLoading, changeURL } = useFetch({
        api: TMBDAxios,
        method: 'get',
        url: url
    });

    useEffect(() => {
        if (props.location.state.query === '')
            return;
        setQuery(props.location.state.query);
        changeURL(url);

        if (response && response.results.length !== 0 && isLoading) {
            setMovies([]);
            try {
                favoriteList.current = JSON.parse(storage.get("FavoriteList"));
            }
            catch (error) {
                console.log(error);
            }
            for (let index = 0, length = response.results.length; index < length; index++) {
                let isLike = false;
                if (favoriteList.current !== null && favoriteList.current.length !== 0) {
                    for (let j = 0, length = favoriteList.current.length; j < length; j++) {
                        if (response.results[index].title === favoriteList.current[j].title) {
                            isLike = true;
                        }
                    }
                }
                /* jshint ignore:start */
                setMovies(oldArray => [...oldArray, <CustomListItem key={response.results[index].id} data={response.results[index]} like={isLike} />]);
                /* jshint ignore:end */
            }
        }
        else if (response && response.results.length === 0 && isLoading) {
            /* jshint ignore:start */
            setMovies("Your search for '" + query + "' did not have any matches");
            /* jshint ignore:end */
        }
    }, [response, favoriteList, isLoading, props, query, changeURL, url]);

    /* jshint ignore:start */
    return (
        <List className={classes.root}>
            <ListItem>
            </ListItem>
            <h2>{movies}</h2>
        </List>
    );
    /* jshint ignore:end */
}
