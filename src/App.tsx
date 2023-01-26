import React, { useState, useCallback, useEffect } from 'react';
import classes from './style.module.scss';
import './App.css';
import { Grid } from '@mui/material';
import AddComment from './components/add';
import ListComment from './components/list';
import AppContext, { ICreateComment, ILikeComment } from './context';
import { IDiscussion } from './interface';
import AppModel from './model';
import CustomToast from './common/toast';

function App() {
  const { initialData, remakeComments, getLastCommentsId } = AppModel
  const [Comments, setComments] = useState<IDiscussion[]>(initialData)

  const createComment = useCallback(({ message, commentID }: ICreateComment) => {
    setComments((prev: IDiscussion[]) => {
      const newMessage: IDiscussion = {
        id: getLastCommentsId(prev) + 1,
        date: Date.now(),
        user: {
          name: 'Mehrpouya ramzi',
          avatar: '/assets/avatars/user-male-circle--v2.png'
        },
        text: message,
        likes: 0,
        iLikedIt: false,
        replies: []
      }
      return commentID ?
        remakeComments({
          comments: prev,
          commentID,
          newMessage
        })
        : [...prev, newMessage]
    })
  }, [])

  const likeComment = useCallback(({ commentID, status }: ILikeComment) => {
    setComments((prev: IDiscussion[]) => {
      return remakeComments({
        comments: prev,
        commentID,
        like: status
      })
    })
  }, [])

  return (
    <>
      <CustomToast />
      <AppContext.Provider value={{
        comments: Comments,
        create: createComment,
        like: likeComment
      }}>
        <Grid container justifyContent="center">
          <Grid container item xs={11} sm={9} md={8} lg={6} flexDirection="column" marginTop={6} marginBottom={6} className={classes.comment}>
            <Grid container item className={classes.add} padding={3}>
              <AddComment />
            </Grid>
            <Grid container item>
              <ListComment />
            </Grid>
          </Grid>
        </Grid>
      </AppContext.Provider>
    </>
  );
}

export default App;
