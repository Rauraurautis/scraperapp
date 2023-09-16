import { FC, useEffect } from 'react'
import { messaging } from '../../lib/firebase';
import { getToken } from 'firebase/messaging';

interface NotificationsProps {

}

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }
    })
}





// Add the public key generated from the console here.
getToken(messaging, { vapidKey: "BGPOUheQ86B6s-Jh7RCDwaRZ8cVI33pcih3IIH9YZy8LsMHg9d0UOuboyI68Rxl8yHdxgINv7h8yQAdO4ddnFIs" })
    .then(token => console.log(token))
    .catch(err => console.log(err))


const Notifications: FC<NotificationsProps> = ({ }) => {

    useEffect(() => {
        requestPermission()
    }, [])
    return <div>Notifications</div>
}

export default Notifications