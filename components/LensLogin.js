import { useWeb3 } from "@3rdweb/hooks";

// lens
import { login } from "../lens-api/authentication/login-user";

function LensLogin() {

    const { address, provider } = useWeb3();

    async function doLogin() {
        try {
          await login(address, provider);
          console.log('Did login')
          
        } catch (err) {
          console.log('error in login: ', err);
        }
    } 

    return (
    <>
        <button onClick={() => doLogin()}>Login to Lens</button>
    </>
    );
}
    
export default LensLogin;