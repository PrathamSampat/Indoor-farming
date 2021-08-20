import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
    homeOutline,
    homeSharp,
    gridOutline,
    gridSharp,
    personOutline,
    personSharp,
    logOutOutline,
    logOutSharp,
    notificationsOutline,
    notificationsSharp,
    helpSharp,
    helpOutline,
    constructOutline,
    constructSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
    // onclick?: (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => void
}

const appPages: AppPage[] = [
    {
        title: "Home",
        url: "/",
        iosIcon: homeOutline,
        mdIcon: homeSharp,
    },
    {
        title: "Modes",
        url: "/modes",
        iosIcon: gridOutline,
        mdIcon: gridSharp,
    },
    {
        title: "Custom Modes",
        url: "/custom-mode",
        iosIcon: constructOutline,
        mdIcon: constructSharp,
    },
    {
        title: "Log Out",
        url: "/logout",
        iosIcon: logOutOutline,
        mdIcon: logOutSharp,
    },
    
];

interface IMenu {
    disabled?: boolean;
}

const Menu: React.FC<IMenu> = ({ disabled }) => {
    const location = useLocation();

    const [user] = useAuthState(auth);

    return (
        <IonMenu contentId="main" type="overlay" disabled={disabled}>
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Indoor Farming</IonListHeader>
                    <IonNote>{user?.displayName}</IonNote>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    className={
                                        location.pathname === appPage.url
                                            ? "selected"
                                            : ""
                                    }
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                >
                                    <IonIcon
                                        slot="start"
                                        ios={appPage.iosIcon}
                                        md={appPage.mdIcon}
                                    />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
