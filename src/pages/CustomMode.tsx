import {
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLoading,
    IonModal,
    IonPage,
    IonText,
    IonTitle,
    IonToast,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import CustomModeModals from "../components/CustomModeModal";
import Header from "../components/Header";
import "./CustomMode.scss";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ModelCard from "../components/ModeCard";

const CustomMode: React.FC = () => {
    const [user] = useAuthState(auth);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [toastMsg, setToastMsg] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [value, loading, error] = useCollection(
        firestore.collection("users/" + user!.uid + "/modes").orderBy("timestamp","desc"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    

    useEffect(() => {
        if (loading) {
            setShowLoading(true);
        } else {
            setShowLoading(false);
        }

        if (error) {
            setToastMsg("Error: " + error.message);
            setShowToast(true);
        } else {
            setShowToast(false);
        }

        if (value) {
            console.log(value);
        }
    }, [loading, error, value]);

    return (
        <IonPage>
            <Header title="Custom Modes" />
            <IonLoading
                cssClass="my-custom-class"
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={"Please wait..."}
            />
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMsg}
                duration={3000}
            />
            <IonContent>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={(e) => setShowModal(true)}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                <IonModal
                    cssClass="modalAdd"
                    mode="ios"
                    swipeToClose={true}
                    onDidDismiss={() => setShowModal(false)}
                    isOpen={showModal}
                >
                    <CustomModeModals setShowModal={setShowModal} />
                </IonModal>

                <div className="customModeDiv" >
                {value && value.docs.length>0 ? (
                    value.docs.map((v) => (
                        <ModelCard
                            key={v.id}
                            title={v.data().modeName}
                            ledEndTime={v.data().ledEndTime}
                            ledStartTime={v.data().ledStartTime}
                            maxBMoist={v.data().maximumBearableMoisture}
                            maxBTemp={v.data().maximumBearableTemperature}
                            minBTemp={v.data().minimumBearableTemperature}
                            minBMoist={v.data().minimumBearableMoisture}
                            modeButtons={true}
                            id={v.id}
                        />
                    ))
                ) : (
                    <IonItem className="noModeText" lines="none" >
                    <IonText  >
                        No Custom Mode Created, click the Add button down below
                        to create new Custom Mode
                    </IonText>
                    </IonItem>
                )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default CustomMode;
