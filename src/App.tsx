import {
    IonContent,
    IonPage,
    IonRouterOutlet,
    IonSpinner,
    IonSplitPane,
} from "@ionic/react";
import { Redirect, Route, useLocation } from "react-router-dom";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home";
import Modes from "./pages/Modes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import CustomMode from "./pages/CustomMode";

const App: React.FC = () => {
    let location = useLocation();
    const [user, loading] = useAuthState(auth);

    return (
        <>
            {!loading ? (
                <IonSplitPane contentId="main">
                    <Menu
                        disabled={["/login", "/signup"].includes(
                            location.pathname
                        )}
                    />
                    <IonRouterOutlet id="main">
                        <Route path="/login" exact={true}>
                            <Login />
                        </Route>
                        <Route path="/signup" exact={true}>
                            <Signup />
                        </Route>

                        <Route path="/" exact={true}>
                            {user ? <Home /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/logout" exact={true}>
                            {user ? <Logout /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/modes" exact={true}>
                            {user ? <Modes /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/custom-mode" exact={true}>
                            {user ? <CustomMode /> : <Redirect to="/login" />}
                        </Route>
                    </IonRouterOutlet>  
                </IonSplitPane>
            ) : (
                <IonSpinner name="crescent" />
            )}
        </>
    );
};

export default App;
