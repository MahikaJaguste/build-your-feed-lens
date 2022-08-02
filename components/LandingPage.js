import { useContext } from "react";
import { AppContext } from "../pages/_app";
import { useRouter } from "next/dist/client/router";

const LandingPage = () => {

    const { signerAddress } = useContext(AppContext);
    const router = useRouter();

    return (
    <>
        <h1>Welcome to Build Your Feed</h1>
        {signerAddress ?
            <>
                <button onClick={() => {
                    router.push({
                        pathname: '/explore-profiles',
                    });
                }}>
                    Explore Profiles
                </button>

                <button onClick={() => {
                    router.push({
                        pathname: '/explore-posts/[walletAddress]',
                        query: { walletAddress: signerAddress },
                    });
                }}>
                    Explore Posts
                </button>
            </>
        : null
        }
    </>
    )
}

export default LandingPage;