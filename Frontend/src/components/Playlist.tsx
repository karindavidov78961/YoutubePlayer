import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy'
import { Button, List, ListItem, ListItemText, TextField, Stack, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { makeStyles } from '@mui/styles';
import io from "socket.io-client";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import playerImg from '../assets/mediaPlayer.png'

interface IURL {
    id: string;
    url: string;
    title: string;
}

const socket = io('http://localhost:5001')

const useStyles = makeStyles({
    list: {
        maxHeight: 250,
        height: '100%',
        overflow: 'auto',
        border: '1px solid #e0e0e0'
    },
});

const Playlist: React.FC = () => {
    const classes = useStyles();
    const [url, setUrl] = useState<string>('');
    const [videoList, setVideoList] = useState<IURL[]>([]);

    useEffect(() => {
        socket.on('playlist', (playlist: IURL[]) => {
            setVideoList(playlist)
        })
    }, [])

    // Press enter
    const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter')
            addVideo()
    }

    const addVideo = async () => {
        if (url) {
            //Get the video title
            await axios.get<any>('https://noembed.com/embed', {
                params: {
                    url: url,
                }
            })
                .then((res) => {
                    if (!res.data.error) {
                        let title = res.data.title;
                        socket.emit('add_video', { url: url, title: title });
                    }
                })
                .catch((e) => console.log(e))

            setUrl('')
        }
    }

    // Remove video
    const removeVideo = (id: string) => {
        socket.emit('remove_video', id)
    }

    // Play next video
    const playNextVideo = () => {
        const tempList = [...videoList]
        const removedVideo = tempList.shift()
        if (removedVideo)
            socket.emit('remove_video', removedVideo.id)
    }

    return (
        <Stack
            direction="row"
            alignItems="stretch"
            spacing={2}>
            <div style={{ border: '2px solid #e0e0e0', width: '30vw', padding: '10px' }}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        style={{ width: '100%' }}
                        type='url'
                        value={url}
                        label="Enter a YouTube URL"
                        variant="outlined"
                        onKeyDown={e => keyPress(e)}
                        onChange={(e) => setUrl(e.target.value)} />
                    <Button variant="outlined" onClick={addVideo}>Add</Button>
                </Stack>
                {videoList.length !== 0 &&
                    <List className={classes.list} sx={{ marginTop: '10px' }}>
                        {videoList.map((video) => (
                            <ListItem key={uuidv4()} divider
                                secondaryAction={
                                    <IconButton onClick={() => removeVideo(video.id)} edge="end">
                                        <RemoveCircleOutlineIcon color='primary' />
                                    </IconButton>
                                }>
                                <ListItemText primary={video.title}></ListItemText>
                            </ListItem>

                        ))}
                    </List>
                }
            </div>
            <div>
                {videoList.length !== 0
                    ? <ReactPlayer url={videoList[0].url} width='40vw' muted={true} playing={true} controls={true} onEnded={playNextVideo} />
                    : <img src={playerImg} height='360px' alt='playerImg' />
                }
            </div>
        </Stack>
    )
}

export default Playlist
