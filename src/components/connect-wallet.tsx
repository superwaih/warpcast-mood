import { useAccount, useConnect } from 'wagmi';
import SignButton from './signin-button';


export default function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <div className="text-center">
        <p className="text-meme-neon text-lg mb-2">Connected account:</p>
        <p className="text-meme-blue font-bold">{address}</p>
        <SignButton />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => connect({ connector: connectors[0] })}
      className="bg-meme-pink text-white px-6 py-3 rounded-lg border-2 border-meme-neon hover:bg-meme-blue transition"
    >
      Connect Wallet
    </button>
  );
}