import { getMessaging } from "firebase-admin/messaging";

const topic = "all";
const message = {
    topic,
    data: {
        title: "test",
        message: "hello world"
    },
}

export const res = getMessaging().send(message);
// .then((response) => {
//     // Response is a message ID string.
//     console.log('Successfully sent message:', response);
// })
// .catch((error) => {
//     console.log('Error sending message:', error);
// });