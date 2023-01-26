import { IDiscussion } from "./interface";

namespace AppModel {

  interface IremakeComments {
    comments: any
    commentID: number
    newMessage?: IDiscussion
    like?: boolean
  }

  export const initialData = [
    {
      id: 1,
      date: 1674725698703,
      user: {
        name: 'Mehrpouya ramzi',
        avatar: '/assets/avatars/user-male-circle--v2.png'
      },
      text: `IGN brings you daily videos about the latest gaming and entertainment news and up to the minute events coverage.Subscribe to IGN's YouTube channel for video .`,
      likes: 2,
      iLikedIt: false,
      replies: [
        {
          id: 3,
          date: 1674726012111,
          user: {
            name: 'Mehran tavakoli',
          },
          text: 'At least four titles are leaving the program on January 31',
          likes: 0,
          iLikedIt: false,
        }
      ]
    },
    {
      id: 2,
      date: 1674730087896,
      user: {
        name: 'Sima rastegar',
      },
      text: `As it does on a regular basis, Microsoft is removing more titles from Xbox Game Pass in the near future.`,
      likes: 1,
      iLikedIt: false,
      replies: [
        {
          id: 4,
          date: 1674726012111,
          user: {
            name: 'Savannah Nguyen',
            avatar: '/assets/avatars/circled-user-female-skin-type-4--v2.png'
          },
          text: 'The four games leaving on January 31 include Telling Lies',
          likes: 0,
          iLikedIt: false,
        }
      ]
    }
  ]

  export const getLastCommentsId = (comments: IDiscussion[]) => {
    let ids: any = []
    comments.map((element: IDiscussion) => {
      if (element.replies && element.replies.length) {
        element.replies.map((el: any) => {
          ids.push(el.id)
        })
      }
      ids.push(element.id)
    });
    return Math.max(...ids)
  }

  export const remakeComments = ({ commentID, comments, newMessage, like }: IremakeComments) => {
    return comments.map((element: IDiscussion) => {
      if (element.replies) remakeComments({
        commentID,
        comments: element.replies,
        like,
        newMessage
      })
      let data = element

      if (element.id === commentID) {
        if (newMessage) {
          data['replies'].push(newMessage)
        } else if (typeof like !== 'undefined') {
          data['iLikedIt'] = like
        }
      }
      return data
    });

  }

}

export default AppModel