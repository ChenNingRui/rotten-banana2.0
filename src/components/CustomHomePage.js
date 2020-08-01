import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@material-ui/core/';

import CustomListItem from '../components/CustomListItem';
import useFetch from '../api/UseFetch';
import TMBDAxios from '../api/TMBD/TMBDAxios';
import config from '../api/TMBD/Config';
import storage from '../Storage';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CustomHomePage() {
    let classes = useStyles();
    let [popMovies, setPopMovies] = useState([]);
    let favoriteList = useRef([]);
    let { response, isLoading } = useFetch({
        api: TMBDAxios,
        method: 'get',
        url: '/movie/popular?api_key=' + config.API_KEY + '&language=en-US&page=1'
    });

    useEffect(() => {
        if (response && isLoading) {
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
                setPopMovies(oldArray => [...oldArray, <CustomListItem key={response.results[index].id} data={response.results[index]} like={isLike} />]);
                /* jshint ignore:end */
            }
        }
    }, [response, favoriteList, isLoading]);

    /* jshint ignore:start */
    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WhatshotIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="What's Popular" />
            </ListItem>
            {popMovies}
        </List>
    );
    /* jshint ignore:end */
}
