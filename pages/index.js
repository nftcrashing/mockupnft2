import { ConnectWallet, useAddress, useContract } from '@thirdweb-dev/react';
import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState(0);
  const address = useAddress();
  const { contract } = useContract(
    '0xF15Ddad2CD550142E43081CD9AA8Be48fCF711E2',
    'signature-drop',
  );

  const mint = async () => {
    const signedPayloadReq = await fetch('/api/generate-signature', {
      method: 'POST',
      body: JSON.stringify({ address, amount }),
    });

    const signedPayload = await signedPayloadReq.json();

    try {
      await contract.signature.mint(signedPayload.signedPayload);
    } catch (err) {
      console.error(err);
    }
  };

  if (!address) {
    return (<center>
      <div style={{ width: '200px' }}>
        <ConnectWallet />
      </div></center>
    );
  }

  return (
    <center>
    <>
      <p></p>

      <p></p>

      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <button onClick={mint}>Mint NFT{amount > 1 && 's'}</button>
    </>
    </center>);
}
