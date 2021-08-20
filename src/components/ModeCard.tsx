import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonToast, useIonAlert } from "@ionic/react";
import { checkmarkCircleOutline, checkmarkOutline, trashOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";
import { confirmMode } from "../temp";
import "./ModeCard.scss"

interface IModelCard {
    img?: string;
    title: string;
    subtitle?: string;
    ledStartTime: number;
    ledEndTime: number;
    minBTemp: number,
    maxBTemp: number,
    minBMoist: number,
    maxBMoist: number,
    modeButtons?: boolean,
    id?: string,
}

const ModelCard: React.FC<IModelCard> = ({
    img,
    title,
    subtitle,
    ledStartTime,
    ledEndTime,
    minBTemp,
    maxBTemp,
    minBMoist,
    maxBMoist,
    modeButtons,
    id
}) => {

    const [user] = useAuthState(auth)
    const [present] = useIonAlert();
    const [showToast, setShowToast] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const [toastMsg, setToastMsg] = useState<string>("")



    const deleteMode = () => {
        setShowLoading(true)
        firestore.collection("users").doc(user!.uid).collection("modes").doc(id).delete().then(()=>{
            setToastMsg("Mode Deleted: " + title)
            setShowToast(true)
        }).catch(err => {
            setToastMsg("Error: " + err)
            setShowToast(true)
        })

        setShowLoading(false)
    }

    return (
        <IonCard className="modeCard " >
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMsg}
                duration={3000}
            />
             <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                
            />
            {img &&
            <IonImg className="modeImg" src={img} /> }

            <IonCardHeader className="modeCardHeader" > 
                <IonCardTitle>{title}</IonCardTitle>
                {subtitle && <IonCardSubtitle> {subtitle} </IonCardSubtitle>}
            </IonCardHeader>

            <IonCardContent>
                <IonList className="transparentBg">
                    <IonItem lines="none" className="transparentBg">
                        <IonLabel>Lights Schedule</IonLabel>
                        <IonBadge color="dark">
                            {ledStartTime}:00 - {ledEndTime}:00
                        </IonBadge>
                    </IonItem>
                    <IonItem lines="none" className="transparentBg">
                        <IonLabel>Bearable Temperature</IonLabel>
                        <IonBadge color="dark">{minBTemp}°C - {maxBTemp}°C</IonBadge>
                    </IonItem>
                    <IonItem lines="none" className="transparentBg">
                        <IonLabel>Bearable Moisture</IonLabel>
                        <IonBadge color="dark">{minBMoist}% - {maxBMoist}%</IonBadge>
                    </IonItem>
                    {modeButtons &&
                        (
                            <IonItem lines="none" className="transparentBg" >
                                <IonButton onClick={() => present({
                                    header: 'Alert',
                                    message: `Delete Mode: ${title}`,
                                    buttons: [
                                        'Cancel',
                                        {text: 'Delete',cssClass:'danger', handler: (d)=>deleteMode()}
                                    ]
                                })} className="modeCardButton" slot="end" fill="outline" color="danger" >
                                    <IonIcon className="modeCardButtonIcon" icon={trashOutline} />
                                </IonButton>

                                <IonButton onClick={() => present({
                                    header: 'Alert',
                                    message: `Confirm Mode: ${title}`,
                                    buttons: [
                                        'Cancel',
                                        {text: 'Confirm',cssClass:'danger', handler: (d)=>{
                                            setShowLoading(true)
                                            confirmMode(user, minBTemp!, minBMoist!, maxBTemp!, maxBMoist!, ledStartTime!, ledEndTime!, title)
                                            setToastMsg(`Mode: ${title} is now Active`)
                                            setShowToast(true)
                                            setShowLoading(false)
                                        }}
                                    ]
                                })} className="modeCardButton" slot="end" fill="outline" >
                                    <IonIcon className="modeCardButtonIcon" icon={checkmarkOutline} />
                                </IonButton>
                            </IonItem>
                        )
                    }
                </IonList>
            </IonCardContent>
        </IonCard>
    );
};

export default ModelCard