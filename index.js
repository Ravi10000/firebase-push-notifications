import admin from "firebase-admin";
import { readFileSync } from 'fs'
import { getMessaging } from "firebase-admin/messaging";

const serviceAccount = JSON.parse(readFileSync("./firebase_credentials.json"));

export const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export async function sendNotification({ topic = "all", title, body, data }) {
    try {
        if (!title || !body) throw new Error("title and body is required");

        const messageString = await getMessaging().send({ topic, ...(data && { data }), notification: { title, body } });
        const messageID = messageString?.split?.("/")?.at?.(-1);

        if (!messageID) throw new Error("message id not found");
        return { messageID }
    } catch (error) {
        console.log(error.message);
        console.error(`error sending notification to topic ${topic}`);
        return { error: error.message }
    }

}

sendNotification({
    topic: "7",
    title: "Test",
    body: "rest",
    data: {
        key: JSON.stringify({ key: "value" }),
        key2: JSON.stringify({ key21: "value21" })
    }
})