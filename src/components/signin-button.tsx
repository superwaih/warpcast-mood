import { useSignMessage } from 'wagmi';

export default function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage();

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => signMessage({ message: 'hello world' })}
        disabled={isPending}
        className="bg-meme-neon text-meme-dark px-6 py-3 rounded-lg border-2 border-meme-pink hover:bg-meme-pink hover:text-white transition disabled:opacity-50"
      >
        {isPending ? 'Signing...' : 'Sign Message'}
      </button>
      {data && (
        <div className="mt-4">
          <p className="text-meme-neon">Signature:</p>
          <p className="text-meme-blue break-all">{data}</p>
        </div>
      )}
      {error && (
        <div className="mt-4">
          <p className="text-meme-pink">Error:</p>
          <p className="text-meme-blue">{error.message}</p>
        </div>
      )}
    </div>
  );
}