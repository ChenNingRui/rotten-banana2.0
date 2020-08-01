import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    CardActions,
    Dialog,
    AppBar,
    DialogContentText,
    Toolbar,
    DialogContent,
    Grid
} from '@material-ui/core/';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import CloseIcon from '@material-ui/icons/Close';

import config from '../api/TMBD/Config';
import storage from '../Storage';
import Iframe from 'react-iframe';
import useFetch from '../api/UseFetch';
import TMBDAxios from '../api/TMBD/TMBDAxios';


const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 180,
        display: 'flex'
    },
    media: {
        height: 165,
        width: 110,
        marginLeft: '10px',
        marginTop: '5px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: "left",
        m: 1,
        width: '70%',
        height: 180,
        overflow: 'auto'
    },
    content: {
        flex: '0 0 auto',
    },
    title: {
        fontSize: 20,
    },
    appBar: {
        position: 'relative',
    },
    videoDiglog: {
        width: '100%',
        height: '100%',
    }
});


export default function CustomListItem(props) {
    let classes = useStyles();
    let [open, setOpen] = useState(false);
    let [openTrailer, setOpenTrailer] = useState(false);
    let { data, like } = props;
    let [isLike, setIsLike] = useState(like);
    let trailerLink = useRef('');
    let favoriteList = [];

    let { response, isLoading } = useFetch({
        api: TMBDAxios,
        method: 'get',
        url: '/movie/' + data.id + '/videos?api_key=' + config.API_KEY + '&language=en-US'
    });

    let handleClickOpen = () => {
        setOpen(true);
    };

    let handleClose = () => {
        setOpen(false);
    };

    let hanldPlayTrailerOpen = () => {
        setOpenTrailer(true);
    };

    let hanldPlayTrailerClose = () => {
        setOpenTrailer(false);
    };

    let handleLikeClick = () => {
        setIsLike(!isLike);

        try {
            let userDate = JSON.parse(storage.get("FavoriteList"));
            if (userDate !== null && userDate.length !== 0) {
                favoriteList = userDate;
            }
        } catch (e) {
            console.log(e);
        }

        if (!isLike) {
            // console.log('add');
            let isHave = false;
            for (let index = 0, length = favoriteList.length; index < length; index++) {
                if (favoriteList[index].title === data.title) {
                    isHave = true;
                    break;
                }
            }
            if (!isHave) {
                favoriteList.push(data);
            }
        } else {
            // console.log('remove');
            for (let index = 0, length = favoriteList.length; index < length; index++) {
                if (favoriteList[index].title === data.title) {
                    favoriteList.splice(index, 1);
                    break;
                }
            }
        }
        storage.set('FavoriteList', JSON.stringify(favoriteList));
    };

    useEffect(() => {
        if (response && isLoading) {
            if (response.results[0]) {

                trailerLink.current = 'http://www.youtube.com/embed/' + response.results[0].key + '?autoplay=1&cc_load_policy=1&vq=large';
            }
        }
    }, [response, isLoading]);

    /* jshint ignore:start */
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={config.API_IMAGE.small + data.poster_path}
                title="Contemplative Reptile"
                placement="left"
            />
            <Box className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography className={classes.title}>
                        {data.title ? data.title : data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.overview}
                    </Typography>
                </CardContent>
            </Box>
            <Box>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" title='Add to favorites' onClick={handleLikeClick}>
                        {!isLike
                            ? <FavoriteBorderIcon />
                            : <FavoriteIcon />
                        }
                    </IconButton>
                    <IconButton onClick={handleClickOpen}
                        aria-label="show more"
                        title='Show more'>
                        <MoreVertIcon />
                    </IconButton>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    {data.title}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogContent>
                            <Grid container>
                                <Box height='50%' width='50%'>
                                    <img alt="Loding" src={config.API_IMAGE.large + data.poster_path}
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = require('../resource/notFound.jpg')
                                        }}
                                        width='50%%' height='50%' />
                                </Box>
                                <Box position='relative' left='auto'>
                                    <IconButton aria-label="add to favorites" title='Add to favorites' onClick={handleLikeClick}>
                                        {isLike
                                            ? <FavoriteIcon />
                                            : <FavoriteBorderIcon />
                                        }
                                    </IconButton>
                                    <IconButton
                                        aria-label="Play Trailer"
                                        title='Play Trailer'
                                        onClick={hanldPlayTrailerOpen}>
                                        < PlayCircleFilledWhiteIcon />
                                    </IconButton>
                                    <Dialog
                                        className={classes.videoDiglog}
                                        open={openTrailer}
                                        onClose={hanldPlayTrailerClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <Iframe url={trailerLink.current}
                                            width="480px"
                                            height="360px"
                                            id="myId"
                                            className="myClassname"
                                            display="initial"
                                            position="relative" />
                                    </Dialog>
                                </Box>
                            </Grid>
                            <DialogContentText id="alert-dialog-description">
                                {data.overview}
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </CardActions>
            </Box>
        </Card >
    );
    /* jshint ignore:end */
}
