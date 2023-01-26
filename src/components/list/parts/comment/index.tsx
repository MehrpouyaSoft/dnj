import React, { useState, useContext } from 'react'
import { Grid, Typography } from '@mui/material';
import Moment from 'react-moment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AvatarCustom from '../../../../common/avatar';
import classes from './style.module.scss';
import { IDiscussion } from '../../../../interface';
import AddComment from '../../../../components/add';
import AppContext from '../../../../context';

interface IProps {
    element: IDiscussion,
    reply?: boolean
}
function Comment({ element, reply }: IProps) {
    const [StatusReply, setStatusReply] = useState(false)
    const { like } = useContext(AppContext)

    return (
        <Grid container flexWrap="nowrap" item columnSpacing={2} className={`${classes.box} ${!reply && element.replies && element.replies.length ? classes.reply : ''}`}>
            <Grid item flexBasis="content">
                <AvatarCustom alt={element.user.name} src={element.user?.avatar || ''} />
            </Grid>
            <Grid item container sm={12} flexDirection="column">
                <Grid item container flexDirection="column" rowSpacing={.8}>
                    <Grid item container alignItems="center" columnSpacing={1}>
                        <Grid item>
                            <Typography variant='h6'>{element.user.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1' color="#9ba4bb"><Moment fromNow>{element.date}</Moment></Typography>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Typography variant='body1' lineHeight={1.6}>{element.text}</Typography>
                    </Grid>
                    <Grid item container alignItems="center" columnSpacing={3}>
                        <Grid item>
                            <Grid item className={`${classes.like} ${element.iLikedIt ? classes.iLiked : ''}`} onClick={() => like({
                                commentID: element.id,
                                status: !element.iLikedIt
                            })}>
                                <Grid item container alignItems="center" columnSpacing={.8}>
                                    <Grid item>
                                        <ThumbUpIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1'><strong>{element.iLikedIt ? element.likes + 1 : element.likes}</strong></Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {!reply && (
                            <Grid item>
                                <Typography
                                    variant='body1'
                                    color="#255fe7"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <strong onClick={() => setStatusReply((prev: boolean) => !prev)}>Reply</strong>
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                {element.replies && element.replies.length ? (
                    <Grid item container flexDirection="column" marginTop={2} rowSpacing={1}>
                        {element.replies.map((el: any, key: number) => (
                            <Grid item container key={key}>
                                <Comment element={el} reply />
                            </Grid>
                        ))}
                    </Grid>
                ) : null}

                {!reply && StatusReply ? (
                    <Grid item container flexDirection="column" marginTop={2}>
                        <AddComment replyID={element.id} />
                    </Grid>
                ) : null}
            </Grid>
        </Grid>
    )
}

export default Comment