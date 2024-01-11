import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationIcon = ({ numNotifications }) => {
    return (
        <IconButton color="inherit">
            <Badge badgeContent={numNotifications} color="error">
                <NotificationsIcon />
            </Badge>
        </IconButton>
    );
};

export default NotificationIcon;