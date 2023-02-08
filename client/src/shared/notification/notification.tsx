import {notification} from 'antd';
import type {NotificationPlacement} from 'antd/es/notification/interface';
import React from "react";

const Context = React.createContext({name: 'Default'});

const [api] = notification.useNotification();

export const OpenNotification = (props: any) => {
    api.info({
        message: `${props.message}`,
        description: <Context.Consumer>{({name}) => ` ${name}!`}</Context.Consumer>,
        placement: props.placement,
    });

    return;
};