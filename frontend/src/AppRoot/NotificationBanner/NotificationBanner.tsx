// libraries
import * as React from 'react'
// components
import CloseIcon from 'shared/CloseIcon/CloseIcon'
import CircleTimer from 'shared/CircleTimer/CircleTimer'
import { Alert } from './styles'
// interface
import { Notification, NotificationCreate } from 'types/types'

interface State {
  notification?: Notification
}

export default class GlobalNotification extends React.Component<{}, State> {
  // class types
  closeCountDown?: number

  constructor(props: {}) {
    super(props)

    this.state = {
      notification: null,
    }

    this.closeCountDown = null

    this.startCloseCountdown = this.startCloseCountdown.bind(this)
    this.addNotification = this.addNotification.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
  }

  render() {
    const { notification } = this.state
    const durationVisible = 6 // time the notification is visible in seconds
    const durationAnimation = 0.5
    return (
      <React.Fragment>
        {notification && (
          <Alert
            role={notification.type}
            durationVisible={durationVisible}
            durationAnimation={durationAnimation}
          >
            {notification.message}
            <CircleTimer clickAction={() => this.removeNotification()}>
              <CloseIcon />
            </CircleTimer>
          </Alert>
        )}
      </React.Fragment>
    )
  }

  startCloseCountdown() {
    // clear current timeout
    if (this.closeCountDown) {
      clearTimeout(this.closeCountDown)
    }
    this.closeCountDown = window.setTimeout(
      () => this.removeNotification(),
      6000
    )
  }

  addNotification(data: NotificationCreate ) {
    this.startCloseCountdown()
    // set a new or overwrite the current notification
    this.setState({
      notification: {
        createdAt: new Date(),
        message: data.message,
        type: data.type,
      },
    })
  }

  removeNotification() {
    this.setState({ notification: null })
    if (this.closeCountDown) {
      clearTimeout(this.closeCountDown)
    }
  }
}