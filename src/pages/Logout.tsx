import { IonLoading, IonSpinner, IonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../firebase";

const Logout: React.FC = () => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [toastMsg, setToastMsg] = useState<string>("");

    const [user, loading, error] = useAuthState(auth);

    let history = useHistory();
    const name = user?.displayName;
    useEffect(() => {
        auth.signOut();
    }, []);

    useEffect(() => {
        if (error) {
            console.log(error);
            setToastMsg(error.message);
            setShowToast(true);
        } else {
            setShowToast(false);
        }
        if (!user) {
            setToastMsg(`Hope to see you again soon, ${name}`);
            setShowToast(true);
            history.push("/");
        } else {
            setShowToast(false);
        }
        if (loading) {
            setShowLoading(true);
        } else {
            setShowLoading(false);
        }
    }, [loading, user, error, history, name]);

    return (
        <>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMsg}
                duration={3000}
            />
            <IonLoading
                cssClass="my-custom-class"
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={"Please wait..."}
            />
            <IonSpinner name="crescent" />
        </>
    );
};

export default Logout;
