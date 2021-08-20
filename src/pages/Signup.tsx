import { IonButton, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from "@ionic/react"
import { eyeOffOutline, eyeOffSharp, eyeOutline, eyeSharp } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { useHistory } from "react-router"
import { auth } from "../firebase"
import { validateEmail, validatePassLength } from "../temp"
import "./Signup.scss"

interface ISignup {

}

const Signup:React.FC<ISignup> = () => {

    const [email, setEmail] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [ipAddress, setIpAddress] = useState<string | null>(null)
    const [passHide, setPassHide] = useState<boolean>(true)
    const [showToast, setShowToast] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const [toastMsg, setToastMsg] = useState<string>("")

    let history = useHistory()

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const signup = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!name) {
            setToastMsg("Enter your Name")
            setShowToast(true)
            return
        }
        if(!ipAddress) {
            setToastMsg("Enter the Ip Address provided to you")
            setShowToast(true)
            return
        }
        if (!email && !password) {
            setToastMsg("Enter Email and Password")
            setShowToast(true)
            return
        }
        if (!email) {
            setToastMsg("Enter Email")
            setShowToast(true)
            return
        }
        if (!validateEmail(email)) {
            setToastMsg("Email in incorrect, please check.")
            setShowToast(true)
            return
        }
        if (!password) {
            setToastMsg("Enter Password")
            setShowToast(true)
            return
        }
        if (!validatePassLength(password)) {
            setToastMsg("Password should be atleast 6 characters ")
            setShowToast(true)
            return
        }
        createUserWithEmailAndPassword(email, password)
    };

    // 192-168-0-103
    useEffect(()=>{
        if(user) {
            user.user!.updateProfile({
                displayName: name,
                photoURL: ipAddress
            })
            setToastMsg(`Welcome, ${name}`)
            setShowToast(true)
            setTimeout(() => {
                history.push('/')                
            }, 2000);
        } else {
            setShowToast(false)
        }
        if(loading) {
            setShowToast(false)
            setShowLoading(true)
        } else {
            setShowLoading(false)
        }
        if(error) {
            if(error.code === "auth/email-already-in-use") {
                setToastMsg("Email already in use")
            } else {
                setToastMsg("Some error occured, check your connection")
            }
            setShowToast(true)
        } else {
            setShowToast(false)
        }
    },[loading,user,error, history])  
    
    return (
        <IonPage>
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
                duration={5000}
            />
            <IonContent>
            <IonToolbar>
                    <IonTitle>Indoor Farming</IonTitle>
                </IonToolbar>
                <IonGrid className="loginContainer">
                    <IonRow className="ion-justify-content-center">
                        <IonText color="primary">
                            <h1 className="loginTitle">SIGN UP</h1>
                        </IonText>
                    </IonRow>
                    <IonRow className="ion-justify-content-center" >
                        <IonItem mode="md" className="loginInput" >
                            <IonLabel position="floating">
                                Name
                            </IonLabel>
                            <IonInput type="text" onIonChange={e => setName(e.detail.value!)} value={name}></IonInput>
                        </IonItem>
                    </IonRow>
                    <IonRow className="ion-justify-content-center" >
                        <IonItem mode="md" className="loginInput" >
                            <IonLabel position="floating">
                                Ip Address provided to you
                            </IonLabel>
                            <IonInput type="text" onIonChange={e => setIpAddress(e.detail.value!)} value={ipAddress}></IonInput>
                        </IonItem>
                    </IonRow>
                    <IonRow className="ion-justify-content-center" >
                        <IonItem mode="md" className="loginInput" >
                            <IonLabel position="floating">
                                Email
                            </IonLabel>
                            <IonInput type="email" onIonChange={e => setEmail(e.detail.value!)} value={email}></IonInput>
                        </IonItem>
                    </IonRow>
                    <IonRow className="ion-justify-content-center" >
                        <IonItem mode="md" className="loginInput" >
                            <IonLabel position="floating">
                                Password
                            </IonLabel>
                            <IonInput type={passHide ? "password" : "text"} onIonChange={e => setPassword(e.detail.value!)} value={password}></IonInput>
                            {/* <IonIcon className="loginEye" slot="end" ios={eyeOutline} md={eyeSharp} /> */}
                            <IonButton className="transparentBg loginEye" onClick={()=>setPassHide((prev)=>!prev)} slot="end"  >
                                <IonIcon ios={!passHide ? eyeOffOutline : eyeOutline} md={!passHide ? eyeOffSharp : eyeSharp} />
                            </IonButton>
                        </IonItem>
                    </IonRow>
                    <IonRow className="ion-justify-content-center" >
                        <IonButton onClick={signup} expand="block" className="loginButton " >SIGN UP</IonButton>
                    </IonRow>
                    <IonRow className="ion-justify-content-center" >
                        <IonButton routerLink="/login" expand="block" className="signupButton " >LOG IN</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Signup