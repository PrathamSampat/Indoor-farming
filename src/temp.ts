import { realtime } from "./firebase";
import firebase from "firebase"

const validateEmail = (mail: string) => {
    if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            mail
        )
    ) {
        return true;
    }
    return false;
};

const validatePassLength = (pass: string) => {
    if(pass.length >= 6) {
        return true
    }
    return false
}

export { validateEmail, validatePassLength };
export const confirmMode = (
    user: firebase.User | null | undefined,
    minBTemp: number,
    minBMoist: number,
    maxBTemp: number,
    maxBMoist: number,
    ledStartTime: number,
    ledEndTime: number,
    currentMode: string
) => {
    if (user) {
        try {
            realtime.ref(user.photoURL! + "/variables").set({
                minimumBearableTemperature: minBTemp,
                maximumBearableTemperature: maxBTemp,
                minimumBearableMoisture: minBMoist,
                maximumBearableMoisture: maxBMoist,
                ledStartTime,
                ledEndTime,
                mode: currentMode,
            });
            return true
        } catch (e) {
            return false
        }
    }
    return false
};
