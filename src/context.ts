import { createContext } from 'react'
import { IProps } from './interface'

export interface ICreateComment {
    message: string
    commentID?: number
}

export interface ILikeComment {
    status: boolean
    commentID: number
}

interface IContext extends IProps {
    create({ }: ICreateComment): void
    like({ }: ILikeComment): void
}
const AppContext = createContext<IContext>({
    comments: [{
        id: 0,
        date: 0,
        user: {
            name: '',
            avatar: ''
        },
        text: '',
        likes: 0,
        iLikedIt: false,
    }],
    create: () => { },
    like: () => { }
})
export default AppContext