import React, {useState} from "react";
import {default as AntButton, ButtonProps} from 'antd/es/button'

export const Button = ({onClick, children, ...props}: ButtonProps) => {
    let [loading, setLoading] = useState(false);

    const onPromiseClick = async (event: any) => {
        if (onClick) {
            setLoading(true);
            try {
                await onClick(event);
            } finally {
                setLoading(false);
            }
        }
    }

    return <AntButton loading={loading} onClick={onPromiseClick} {...props}>{children}</AntButton>
}
