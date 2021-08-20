import { IonButton, IonContent, IonDatetime, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonRange, IonRow, IonText, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";
import firebase from 'firebase'


interface ICustomModeModals {
    setShowModal: (value: React.SetStateAction<boolean>) => void
}

const CustomModeModals: React.FC<ICustomModeModals> = ({setShowModal}) => {
    const [name, setName] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const [toastMsg, setToastMsg] = useState<string>("")
    const [ledStartTime, setLedStartTime] = useState<string | null | undefined>(
        "01:01"
    );
    const [ledEndTime, setLedEndTime] = useState<string | null | undefined>(
        "01:01"
    );
    const [tempRange, setTempRange] = useState<{
        lower: number;
        upper: number;
    }>({ lower: 10, upper: 40 });

    const [moistRange, setMoistRange] = useState<{
        lower: number;
        upper: number;
    }>({ lower: 15, upper: 50 });

    const [user] = useAuthState(auth)

    const createMode = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log(ledStartTime)
        if(!name) {
            setToastMsg("Enter Mode Name")
            setShowToast(true)
            return
        }
        setShowLoading(true)
        firestore.collection("users").doc(user!.uid).collection("modes").add({
            modeName: name,
            ledStartTime: parseInt(ledStartTime!.split(":")[0]),
            ledEndTime: parseInt(ledEndTime!.split(":")[0]),
            minimumBearableTemperature: tempRange.lower,
            maximumBearableTemperature: tempRange.upper,
            minimumBearableMoisture: moistRange.lower,
            maximumBearableMoisture: moistRange.upper,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(()=>{
            setToastMsg("Mode Created Successfully")
            setShowToast(true)
            setShowLoading(false)
            setShowModal(false)
        }).catch((error)=>{
            setToastMsg(`Error: ${error} `)
            setShowToast(true)
            setShowLoading(false)
        })

    }

    return (
        <IonContent>
             <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                
            />
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMsg}
                duration={3000}
            />
            <IonToolbar>
                <IonTitle>New Custom Mode</IonTitle>
                <IonButton
                    slot="end"
                    fill="clear"
                    onClick={(e) => setShowModal(false)}
                >
                    <IonIcon icon={close} />
                </IonButton>
            </IonToolbar>

            <IonGrid className="modalList ">
                <IonRow className="ion-justify-content-center">
                    <IonItem mode="md" className="loginInput modeInput">
                        <IonLabel position="stacked">Mode Name</IonLabel>
                        <IonInput
                            placeholder="Enter name for your mode"
                            type="text"
                            onIonChange={(e) => setName(e.detail.value!)}
                            value={name}
                        ></IonInput>
                    </IonItem>
                </IonRow>
                <IonRow>
                    <IonGrid>
                        <IonRow className="ion-margin-start">
                            <IonText>
                                <h4>Lights Schedule</h4>
                            </IonText>
                        </IonRow>
                        <IonRow className="ion-justify-content-center ion-margin-bottom  ">
                            <IonItem className="modeItem" lines="none">
                                <IonLabel>Start Time</IonLabel>
                                <IonDatetime
                                    displayFormat="HH:mm"
                                    value={ledStartTime}
                                    onIonChange={(e) =>
                                        setLedStartTime(e.detail.value!)
                                    }
                                />
                            </IonItem>
                        </IonRow>
                        <IonRow className="ion-justify-content-center  ">
                            <IonItem className="modeItem" lines="none">
                                <IonLabel>End Time</IonLabel>
                                <IonDatetime
                                    displayFormat="HH:mm"
                                    value={ledEndTime}
                                    onIonChange={(e) =>
                                        setLedEndTime(e.detail.value!)
                                    }
                                />
                            </IonItem>
                        </IonRow>
                    </IonGrid>
                </IonRow>
                <IonRow>
                    <IonGrid>
                        <IonRow className="ion-margin-start">
                            <IonText>
                                <h4>Bearable Temperature</h4>
                            </IonText>
                        </IonRow>
                        <IonRow className="ion-justify-content-center   ">
                            <IonItem className="modeItem" lines="none">
                                <IonRange
                                    dualKnobs={true}
                                    min={10}
                                    max={40}
                                    color="secondary"
                                    pin={true}
                                    onIonChange={(e) =>
                                        setTempRange(e.detail.value as any)
                                    }
                                >
                                    <IonLabel slot="start">
                                        {tempRange.lower}°C
                                    </IonLabel>
                                    <IonLabel slot="end">
                                        {tempRange.upper}°C
                                    </IonLabel>
                                </IonRange>
                            </IonItem>
                        </IonRow>
                    </IonGrid>
                </IonRow>
                <IonRow>
                    <IonGrid>
                        <IonRow className="ion-margin-start">
                            <IonText>
                                <h4>Bearable Moisture</h4>
                            </IonText>
                        </IonRow>
                        <IonRow className="ion-justify-content-center ion-margin-bottom  ">
                            <IonItem className="modeItem" lines="none">
                                <IonRange
                                    dualKnobs={true}
                                    min={15}
                                    max={50}
                                    color="secondary"
                                    pin={true}
                                    onIonChange={(e) =>
                                        setMoistRange(e.detail.value as any)
                                    }
                                >
                                    <IonLabel slot="start">
                                        {moistRange.lower}%
                                    </IonLabel>
                                    <IonLabel slot="end">
                                        {moistRange.upper}%
                                    </IonLabel>
                                </IonRange>
                            </IonItem>
                        </IonRow>
                    </IonGrid>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonButton
                        expand="block"
                        fill="solid"
                        className="modeButton"
                        onClick={createMode}
                    >
                        CREATE
                    </IonButton>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default CustomModeModals;
