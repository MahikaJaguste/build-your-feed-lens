import { useWeb3 } from "@3rdweb/hooks";
import { useState } from "react";

// lens
import { login } from "../lens-api/authentication/login-user";
import { verify } from "../lens-api/authentication/verify-jwt";

function LensLogin() {

    const { address, provider } = useWeb3();
    const [showLensLogin, setShowLensLogin] = useState(true);
    let auth_token, verified;

    async function doLogin() {
        try {

          await login(address, provider);
          console.log('Did login')
          setShowLensLogin(false);
          
        } catch (err) {
          console.log('error in login: ', err);
        }
    } 

    // async function doVerification() {
    //   auth_token = window.localStorage.getItem('auth_token');
    //   const response = await verify(auth_token);
    //   verified = response.data.verify;
    // }

    // useEffect(() => {
    //   doVerification()
    // }, [address])

    return (
    <>
    {/* {verified ? null : <button onClick={() => doLogin()}>Login to Lens</button> }  */}
    <button hidden={showLensLogin} onClick={() => doLogin()}>Login to Lens</button>
    </>
    );
}
    
export default LensLogin;