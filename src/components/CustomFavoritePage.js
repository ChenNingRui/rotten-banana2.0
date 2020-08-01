import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@material-ui/core/';

import storage from '../Storage';
import CustomListItem from './CustomListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CustomFavoritePage() {
    let classes = useStyles();
    let [popMovies, setPopMovies] = useState([]);
    let favoriteList = useRef([]);

    useEffect(() => {
        try {
            favoriteList.current = JSON.parse(storage.get("FavoriteList"));
        }
        catch (error) {
            console.log(error);
        }
        if (favoriteList.current !== null && favoriteList.current.length !== 0) {
            for (let i = 0, length = favoriteList.current.length; i < length; i++) {
                /* jshint ignore:start */
                setPopMovies(oldArray => [...oldArray, <CustomListItem key={favoriteList.current[i].id} data={favoriteList.current[i]} like={true} />]);
                /* jshint ignore:end */
            }
        }
    }, []);

    /* jshint ignore:start */
    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FavoriteIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="My Favorites" />
            </ListItem>
            {popMovies}
        </List>
    );
    /* jshint ignore:end */
}
