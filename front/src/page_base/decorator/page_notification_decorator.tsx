import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../../hooks/use_page_base_theme";

export enum NotificationType {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export interface Notification {
  type: NotificationType;
  text: string;
  permanent: boolean;
}

interface IdentifiableNotification extends Notification {
  id: number;
}

export let publishNotification: (notification: Notification) => void;

export const PageNotificationDecorator = (
  props: React.PropsWithChildren<{}>
) => {
  const style = usePageNotificationStyle();
  const deleteNotificationTimeout: number = 3000;
  let nextId: number = 0;
  const [notifications, setNotifications] = React.useState<
    IdentifiableNotification[]
  >([]);
  const notificationsRef = React.useRef(notifications);
  notificationsRef.current = notifications;
  publishNotification = (notification) => {
    const id: number = nextId++;
    if (!notification.permanent) {
      setTimeout(() => {
        setNotifications(notificationsRef.current?.filter((n) => n.id !== id));
      }, deleteNotificationTimeout);
    }
    setNotifications([...notifications, { ...notification, id }]);
  };
  return (
    <div css={style}>
      <div className="notification-container">
        {notifications.map((notification) => {
          return (
            <div
              key={`${notification.text}-${notification.type}`}
              className={`notification ${notification.type}`}
            >
              <span className="notification-text">{notification.text}</span>
              <span>x</span>
            </div>
          );
        })}
      </div>
      {props.children}
    </div>
  );
};

function usePageNotificationStyle() {
  const theme = usePageBaseTheme();
  return css`
    label: page-notification-decorator;

    .notification-container {
      position: fixed;
      right: 0;
    }

    .notification {
      border-radius: ${theme.borderRadius};
      border-left: 4px solid;

      min-width: 250px;
      min-height: 80px;

      &-text {
        margin: auto 8px;
      }

      &.ERROR {
        border-color: ${theme.notifications.errorDark};
        background-color: ${theme.notifications.error};
      }

      &.INFO {
        border-color: ${theme.notifications.infoDark};
        background-color: ${theme.notifications.info};
      }

      &.WARNING {
        border-color: ${theme.notifications.warningDark};
        background-color: ${theme.notifications.warning};
      }
    }
  `;
}
