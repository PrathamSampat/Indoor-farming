import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

interface IHeader {
    title: string;
}

const Header: React.FC<IHeader> = ({title}) => {
    return (
        <IonHeader >
            <IonToolbar  > 
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{title}</IonTitle>

            </IonToolbar>
        </IonHeader>
    )
}



export default Header
