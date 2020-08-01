import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
    Box,
    Button,
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Menu,
    MenuItem
} from '@material-ui/core';

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '10ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    sectionDesktop: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    }
}));

export default function CustomNavBar(props) {
    let classes = useStyles();
    let [anchorEl, setAnchorEl] = useState(null);
    let [query, setQuery] = useState('');
    let history = useHistory();

    let handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let handleClose = () => {
        setAnchorEl(null);
    };

    let handleHomePageClick = () => {
        history.push("/");
    };

    let handleMyFavoriteClick = () => {
        history.push("/Favorite");
    };

    let handleSearchChange = (prop) => (event) => {
        setQuery(event.target.value);

        //in case the bad requests
        // if (event.target.value === '')
        //     return;
        history.push({
            pathname: '/Search',
            search: '?query=' + event.target.value,
            state: { query: event.target.value }
        });
    };

    /* jshint ignore:start */
    return (
        <Box className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleHomePageClick}>
                            <HomeIcon />
                            Home Page
                        </MenuItem>
                        <MenuItem onClick={handleMyFavoriteClick}>
                            <FavoriteIcon />
                            My Favorites
                        </MenuItem>
                    </Menu>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Rotten Banana
                    </Typography>
                    <Box className={classes.search}>
                        <Box className={classes.searchIcon}>
                            <SearchIcon />
                        </Box>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            value={query}
                            onChange={handleSearchChange(query)}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Box>
                    <Box className={classes.grow} />
                </Toolbar>
            </AppBar>
        </Box>
    );
    /* jshint ignore:end */
}
