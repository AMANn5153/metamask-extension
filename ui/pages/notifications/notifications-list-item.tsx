import React, { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { MetaMetricsContext } from '../../contexts/metametrics';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../shared/constants/metametrics';
import type { Notification } from '../../../app/scripts/controllers/metamask-notifications/types/notification/notification';
import { Box } from '../../components/component-library';
import {
  BlockSize,
  Display,
  FlexDirection,
} from '../../helpers/constants/design-system';
import { NOTIFICATIONS_ROUTE } from '../../helpers/constants/routes';
import { useMarkNotificationAsRead } from '../../hooks/metamask-notifications/useNotifications';
import { TRIGGER_TYPES } from '../../../app/scripts/controllers/metamask-notifications/constants/notification-schema';
import {
  NotificationComponents,
  hasNotificationComponents,
} from './notification-components';

export function NotificationsListItem({
  notification,
}: {
  notification: Notification;
}) {
  const history = useHistory();
  const trackEvent = useContext(MetaMetricsContext);

  const { markNotificationAsRead } = useMarkNotificationAsRead();

  const handleNotificationClick = useCallback(() => {
    trackEvent({
      category: MetaMetricsEventCategory.NotificationInteraction,
      event: MetaMetricsEventName.NotificationClicked,
      properties: {
        notification_id: notification.id,
        notification_type: notification.type,
        notification_is_read: notification.isRead,
        ...(notification.type !== TRIGGER_TYPES.FEATURES_ANNOUNCEMENT && {
          chain_id: notification?.chain_id,
        }),
        click_type: 'item',
      },
    });
    markNotificationAsRead([
      {
        id: notification.id,
        type: notification.type,
        isRead: notification.isRead,
      },
    ]);
    history.push(`${NOTIFICATIONS_ROUTE}/${notification.id}`);
  }, [notification, markNotificationAsRead, history]);

  if (!hasNotificationComponents(notification.type)) {
    return null;
  }
  const ncs = NotificationComponents[notification.type];

  return (
    <Box
      display={Display.Flex}
      flexDirection={FlexDirection.Row}
      width={BlockSize.Full}
      onClick={handleNotificationClick}
    >
      <ncs.item notification={notification} onClick={handleNotificationClick} />
    </Box>
  );
}
