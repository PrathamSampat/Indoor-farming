import {
    IonButton,
    IonCardSubtitle,
    IonContent,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToast,
    IonToolbar,
    useIonLoading,
    useIonToast,
} from "@ionic/react";
import {
    eyeOffOutline,
    eyeOffSharp,
    eyeOutline,
    eyeSharp,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { validateEmail, validatePassLength } from "../temp";
import { useSignInWithEmailAndPassword  } from 'react-firebase-hooks/auth';
import "./Login.scss";
import { auth } from "../firebase";
import { useHistory } from "react-router";

interface ILogin {}

const Login: React.FC<ILogin> = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [passHide, setPassHide] = useState<boolean>(true);
    const [showToast, setShowToast] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const [toastMsg, setToastMsg] = useState<string>("")

    let history = useHistory()

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const login = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        e.preventDefault();
        
        if (!email && !password) {
            setToastMsg("Enter Email and Password")
            // setShowToast(true)
            return
        }
        if (!email) {
            setToastMsg("Enter Email")
            // setShowToast(true)
            return
        }
        if (!validateEmail(email)) {
            setToastMsg("Email in incorrect, please check.")
            // setShowToast(true)
            return
        }
        if (!password) {
            setToastMsg("Enter Password")
            // setShowToast(true)
            return
        }
        if (!validatePassLength(password)) {
            setToastMsg("Password should be atleast 6 characters ")
            // setShowToast(true)
            return
        }
        signInWithEmailAndPassword(email, password)
    };

    useEffect(()=>{
        setShowToast(true)
    },[toastMsg])

    useEffect(()=>{
        setToastMsg("")
        if(loading) {
            // setShowToast(false)
            setShowLoading(true)
        } else {
            setShowLoading(false)
        }
        // if(user) {
        //     // console.log(user.user)
        //     setToastMsg(`Welcome Back, ${user.user!.displayName}`)
            // setShowToast(true)
        //     history.push('/')
        // } else {
            // setShowToast(false)
        // }
        if(user) {
            history.push('/')
            setToastMsg(`Welcome Back, ${user.user!.displayName}`)
            // setShowToast(true)
        }else {
            // setShowToast(false)
        }

        if(error) {
            console.log(error.code)
            if(error.code === "auth/user-not-found") {
                setToastMsg("User not found")
            } else if(error.code === "auth/wrong-password") {
                setToastMsg("Incorrect Password")
            } else {
                setToastMsg("Some error occured, check your connection")
            }
            // setShowToast(true)
        } else {
            // setShowToast(false)
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
                
            />
            <IonContent>
                <IonToolbar>
                    <IonTitle>Indoor Farming</IonTitle>
                </IonToolbar>
                <IonGrid className="loginContainer">
                    <IonRow className="ion-justify-content-center">
                        <IonText color="primary">
                            <h1 className="loginTitle">LOGIN</h1>
                        </IonText>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonItem mode="md" className="loginInput">
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                                type="email"
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                value={email}
                            ></IonInput>
                        </IonItem>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonItem mode="md" className="loginInput">
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                type={passHide ? "password" : "text"}
                                onIonChange={(e) =>
                                    setPassword(e.detail.value!)
                                }
                                value={password}
                            ></IonInput>
                            {/* <IonIcon className="loginEye" slot="end" ios={eyeOutline} md={eyeSharp} /> */}
                            <IonButton
                                className="transparentBg loginEye"
                                onClick={() => setPassHide((prev) => !prev)}
                                slot="end"
                            >
                                <IonIcon
                                    ios={!passHide ? eyeOffOutline : eyeOutline}
                                    md={!passHide ? eyeOffSharp : eyeSharp}
                                />
                            </IonButton>
                        </IonItem>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonButton
                            onClick={login}
                            expand="block"
                            className="loginButton "
                        >
                            LOG IN
                        </IonButton>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonButton
                            routerLink="/signup"
                            expand="block"
                            className="signupButton "
                        >
                            SIGN UP
                        </IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;
