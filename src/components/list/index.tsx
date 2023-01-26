import React, { useContext } from 'react'
import { Grid } from '@mui/material';
import AppContext from '../../context';
import Comment from './parts/comment';
import classes from './style.module.scss';

function ListComment() {
    const { comments } = useContext(AppContext)

    return (
        <Grid container rowSpacing={3}>
            {comments ? comments.map((el: any, key: number) => (
                <Grid item container className={classes.comment} key={key}>
                    <Grid item container padding={3}>
                        <Comment element={el} />
                    </Grid>
                </Grid>
            )) : null}
        </Grid>
    )
}

export default ListComment