import {
    IonBadge,
    IonButton,
    IonContent,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonPage,
    IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../components/Header";
import { auth, realtime } from "../firebase";
import "./Home.scss";

interface IHome {}

const Home: React.FC<IHome> = () => {
    const [data, setData] = useState<any | undefined | null>();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            console.log(user.photoURL)
            var starCountRef = realtime.ref(user.photoURL!);
            starCountRef.on("value", (snapshot) => {
                setData(snapshot.val());
            });
        }
    }, [user]);

    return (
        <IonPage>
            <Header title="Home" />

            <IonContent fullscreen>
                {data ? (
                    <>
                        <IonItemGroup className="ion-padding radCircle">
                            <IonItemDivider>
                                <IonLabel>Current Mode: {data.variables.mode} </IonLabel>
                            </IonItemDivider>

                            <IonItem>
                                <IonLabel>Lights</IonLabel>
                                <IonBadge color="dark">
                                    {data.status.led === "0" ? "Off" : "On"}
                                </IonBadge>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Lights Schedule</IonLabel>
                                <IonBadge color="dark">
                                    {data.variables.ledStartTime}:00 - {data.variables.ledEndTime}:00
                                </IonBadge>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Temperature</IonLabel>
                                <IonBadge color="dark">
                                    {data.status.temperature}°C
                                </IonBadge>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Bearable Temperature</IonLabel>
                                <IonBadge color="dark">
                                    {data.variables.minimumBearableTemperature}°C - {data.variables.maximumBearableTemperature}°C
                                </IonBadge>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Moisture</IonLabel>
                                <IonBadge color="dark">
                                    {data.status.moisture}%
                                </IonBadge>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Bearable Moisture</IonLabel>
                                <IonBadge color="dark">
                                    {data.variables.minimumBearableMoisture}% - {data.variables.maximumBearableMoisture}%
                                </IonBadge>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Exhausht</IonLabel>
                                <IonBadge color="dark">
                                    {data.status.exhaust === 0 ? "Off" : "On"}
                                </IonBadge>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Pump</IonLabel>
                                <IonBadge color="dark">
                                    {data.status.pump === 0 ? "Off" : "On"}
                                </IonBadge>
                            </IonItem>
                        </IonItemGroup>

                        <IonButton
                            routerLink="/modes"
                            expand="block"
                            className="ion-padding homeButton "
                        >
                            CHANGE MODE
                        </IonButton>
                    </>
                ) : (
                    <IonTitle>Device not set up yet</IonTitle>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;
