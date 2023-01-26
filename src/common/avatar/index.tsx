import React, { useCallback, memo } from 'react'
import { Avatar } from '@mui/material';

interface IProps {
    src: string
    alt: string
}
function AvatarCustom({ src, alt }: IProps) {

    const stringToColor = useCallback(
        (string: string) => {
            let hash = 0;
            let i;

            /* eslint-disable no-bitwise */
            for (i = 0; i < string.length; i += 1) {
                hash = string.charCodeAt(i) + ((hash << 5) - hash);
            }

            let color = '#';

            for (i = 0; i < 3; i += 1) {
                const value = (hash >> (i * 8)) & 0xff;
                color += `00${value.toString(16)}`.slice(-2);
            }
            /* eslint-enable no-bitwise */

            return color;
        }, []
    )



    const stringAvatar = useCallback((name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 56,
                height: 56
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }, [])

    return (
        <Avatar
            {...src.length ? {
                sx: { width: 64, height: 64 },
                src: src
            } : stringAvatar(alt)}
            alt={alt}
        />
    )
}

export default memo(AvatarCustom)