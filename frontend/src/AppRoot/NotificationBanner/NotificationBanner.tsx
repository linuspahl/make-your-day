// "Root" component to create a page independent notification banner
// This componnents gets included as a reference in the AppRoot.
// With the reference, we call the addNotification function, to trigger a new notification,
// outside of this component

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

export default class NotificationBanner extends React.Component<{}, State> {
  private closeCountDown?: number
  private visibilityDuration: number
  private closeAnimationDuration: number

  public constructor(props: {}) {
    super(props)

    this.state = {
      notification: null,
    }

    // Duration a new notification is visible in s
    this.visibilityDuration = 6
    // Duration of the close animation in s
    this.closeAnimationDuration = 0.5

    this.closeCountDown = null

    this.initiateCloseTimeout = this.initiateCloseTimeout.bind(this)
    this.addNotification = this.addNotification.bind(this)
    this.closeNotification = this.closeNotification.bind(this)
  }

  public render(): JSX.Element {
    const { notification } = this.state
    return (
      <React.Fragment>
        {notification && (
          <Alert
            role={notification.type}
            durationVisible={this.visibilityDuration}
            durationAnimation={this.closeAnimationDuration}
          >
            {notification.message}
            <CircleTimer clickAction={(): void => this.closeNotification()}>
              <CloseIcon />
            </CircleTimer>
          </Alert>
        )}
      </React.Fragment>
    )
  }

  // initiateCloseTimeout - Needed to trigger the banner closing after X seconds
  private initiateCloseTimeout(): void {
    // If existing, clear current timeout
    if (this.closeCountDown) {
      clearTimeout(this.closeCountDown)
    }
    // Create timeout to trigger the close
    this.closeCountDown = window.setTimeout(
      (): void => this.closeNotification(),
      this.visibilityDuration * 1000
    )
  }

  // addNotification - The function to add a new notification
  public addNotification(data: NotificationCreate): void {
    this.initiateCloseTimeout()
    // set a new or overwrite the current notification
    this.setState({
      notification: {
        createdAt: new Date(),
        message: data.message,
        type: data.type,
      },
    })
  }

  // closeNotification - Will close the notification
  private closeNotification(): void {
    // Deletes the state notification entry.
    this.setState({ notification: null })
    // And clears the timeout, that triggered this close action
    clearTimeout(this.closeCountDown)
  }
}
