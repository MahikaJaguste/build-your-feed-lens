// import { signText } from './ethers-service';
import { generateChallenge } from './generate-challenge'
import { authenticate } from './authenticate'

export const login = async (address, provider) => {
  // we grab the address of the connected wallet

  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);

  const signText = async (text) => {
    let signer;
    if (provider) {
      signer = provider.getSigner();
    }
    const signature = await signer.signMessage(text);
    return signature;
  }

  // sign the text with the wallet
  const signature = await signText(challengeResponse.data.challenge.text)

  const accessTokens = await authenticate(address, signature);

  window.localStorage.setItem('auth_token', accessTokens.data.authenticate.accessToken);
  window.localStorage.setItem('refresh_token', accessTokens.data.authenticate.refreshToken);

}