import React, { useContext, useState, useCallback } from 'react'
import { Grid } from '@mui/material';
import AvatarCustom from '../../common/avatar';
import TextBoxCustom from '../../common/textbox';
import AppContext from '../../context';
import { toast } from 'react-toastify'
import classes from './style.module.scss';
import SendIcon from '@mui/icons-material/Send';

interface IProps {
    replyID?: number
}

function AddComment({ replyID }: IProps) {
    const { create } = useContext(AppContext)
    const [Message, setMessage] = useState('')

    const submit = useCallback((e: any) => {
        e.preventDefault()
        if (!Message.length) return toast.error('Please enter message')

        create({
            message: Message,
            ...replyID && { commentID: replyID }
        })
        toast.success('Your message added')
        setMessage('')
        if (!replyID) setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight + 100,
                behavior: 'smooth'
            });
        }, 1000);
    }, [Message])


    return (
        <form
            style={{ width: '100%' }}
            onSubmit={submit}
        >
            <Grid container columnSpacing={2} flexWrap="nowrap" alignItems="center">
                <Grid item flexBasis="content">
                    <AvatarCustom alt="Mehrpouya ramzi" src="/assets/avatars/user-male-circle--v2.png" />
                </Grid>
                <Grid item sm={12}>
                    <Grid container position="relative">
                        {Message.length ? <button className={classes.send} onClick={submit}><SendIcon /></button> : null}
                        <TextBoxCustom onChange={(e: any) => setMessage(e.target.value)} value={Message} placeholder={replyID ? "Reply" : "Start a discussion"} />
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddComment