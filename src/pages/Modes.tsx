import {
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonText,
    IonToast,
} from "@ionic/react";
import React, { useState } from "react";
import Header from "../components/Header";
import "./Modes.scss";
import fruits from "../assets/fruits.png";
import vegetables from "../assets/vegetables.png";
import fruitsMode from "../assets/fruitsMode.jpg";
import vegetablesMode from "../assets/vegetablesMode.jpg";
import ModelCard from "../components/ModeCard";
import { auth, realtime } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { confirmMode } from "../temp";

interface IModes {}

const Modes: React.FC<IModes> = () => {
    const [currentMode, setCurrentMode] = useState<string>("fruits");

    const [minBTemp, setMinBTemp] = useState<number | null>(22);
    const [maxBTemp, setMaxBTemp] = useState<number | null>(30);
    const [minBMoist, setMinBMoist] = useState<number | null>(34);
    const [maxBMoist, setMaxBMoist] = useState<number | null>(40);
    const [ledStartTime, setLedStartTime] = useState<number | null>(6);
    const [ledEndTime, setLedEndTime] = useState<number | null>(16);
    const [toastMsg, setToastMsg] = useState<string>("")
    const [showToast, setShowToast] = useState<boolean>(false)

    const [user] = useAuthState(auth);

    const changeMode = (mode: string) => {
        setCurrentMode(mode);
        if (mode === "fruits") {
            setMinBTemp(22);
            setMaxBTemp(30);
            setMinBMoist(34);
            setMaxBMoist(40);
            setLedStartTime(6);
            setLedEndTime(16);
        } else if (mode === "vegetables") {
            setMinBTemp(18);
            setMaxBTemp(25);
            setMinBMoist(28);
            setMaxBMoist(33);
            setLedStartTime(6);
            setLedEndTime(15);
        }
    };

    const confirmModeButton = (
        e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        if(confirmMode(user, minBTemp!, minBMoist!, maxBTemp!, maxBMoist!, ledStartTime!, ledEndTime!, currentMode!)) {
            setToastMsg(`Mode ${currentMode} set successfully`);
            setShowToast(true);
        } else {
            setToastMsg(`There was some error setting the mode, check your internet connection`);
            setShowToast(true);
        }
    };
    

    return (
        <IonPage>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMsg}
                duration={3000}
            />
            <Header title="Modes" />

            <IonContent fullscreen>
                <IonItem
                    lines="none"
                    className="segment ion-padding-start ion-padding-end   "
                >
                    <IonSegment
                        value={currentMode}
                        mode="ios"
                        onIonChange={(e) => changeMode(e.detail.value!)}
                    >
                        <IonSegmentButton value="fruits">
                            <IonImg
                                className="modeIcon"
                                src={fruits}
                                alt="fruits"
                            />
                            <IonLabel>Fruits</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="vegetables">
                            <IonImg
                                className="modeIcon"
                                src={vegetables}
                                alt="vegetables"
                            />
                            <IonLabel>Vegetables</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonItem>

                {currentMode === "fruits" && (
                    <ModelCard
                        img={fruitsMode}
                        title="Fruits"
                        subtitle="Fruits require red spectrum light in abundance and little of blue to grow. Directly
                            absorbing red spectrum of light helps it grow
                            faster, better, and healthier."
                        ledStartTime={6}
                        ledEndTime={15}
                        minBTemp={22}
                        maxBTemp={30}
                        minBMoist={34}
                        maxBMoist={40}
                    />
                )}
                
                {currentMode === "vegetables" && (
                    <ModelCard
                        img={vegetablesMode}
                        title="Vegetables"
                        subtitle="Vegetables require red and blue spectrum light to grow. Directly
                            absorbing red and blue spectrum of light helps it grow
                            faster, better, and healthier." 
                        ledStartTime={6}
                        ledEndTime={16}
                        minBTemp={18}
                        maxBTemp={25}
                        minBMoist={28}
                        maxBMoist={33}
                    />
                )}

                <IonButton
                    color="tertiary"
                    onClick={confirmModeButton}
                    fill="outline"
                    expand="block"
                    className="ion-padding customModeBtn "
                >
                    Confirm Mode: {currentMode}
                </IonButton>
                <IonButton
                    routerLink="/custom-mode"
                    color="tertiary"
                    expand="block"
                    className="ion-padding customModeBtn "
                >
                    Custom Mode
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Modes;
