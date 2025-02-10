/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

// Phantom Wallet types and declarations
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
interface ConnectOpts {
  onlyIfTrusted: boolean;
}
interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  isPhantom: boolean;
}
declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

const AuthTest: React.FC = () => {
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState<PublicKey | null>(null);
  const [walletAvail, setWalletAvail] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [nonce, setNonce] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [fingerprint] = useState<string>("test-fingerprint-123");

  // Check for Phantom Wallet on mount
  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window as Window & { solana?: PhantomProvider };
      if (solWindow.solana?.isPhantom) {
        setProvider(solWindow.solana);
        setWalletAvail(true);
        // Attempt eager connection
        solWindow.solana.connect({ onlyIfTrusted: true }).catch(() => {});
      }
    }
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (!provider) return;

    const handleConnect = (publicKey: PublicKey) => {
      setConnected(true);
      setPubKey(publicKey);
    };

    const handleDisconnect = () => {
      setConnected(false);
      setPubKey(null);
    };

    provider.on("connect", handleConnect);
    provider.on("disconnect", handleDisconnect);

    // return () => {
    //   provider.off("connect", handleConnect);
    //   provider.off("disconnect", handleDisconnect);
    // };
  }, [provider]);

  const handleConnectWallet = async () => {
    if (!provider) {
      alert("Please install Phantom Wallet!");
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      await provider.connect();
    } catch (error) {
      console.error("Connection error:", error);
      alert("Failed to connect to Phantom Wallet");
    }
  };

  const handleGetNonce = async () => {
    if (!pubKey) {
      alert("Connect wallet first!");
      return;
    }

    try {
      const response = await fetch("/api/auth/nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get nonce");
      }

      const data = await response.json();
      setNonce(data.nonce);
    } catch (error: any) {
      console.error("Error getting nonce:", error);
      alert(`Error getting nonce: ${error.message}`);
    }
  };

  const handleSignMessage = async () => {
    if (!provider || !pubKey || !nonce) {
      alert("Connect wallet and get nonce first!");
      return;
    }

    try {
      const message = new TextEncoder().encode(nonce);
      const { signature: sig } = await provider.signMessage(message);
      setSignature(bs58.encode(sig));
    } catch (error) {
      console.error("Signature error:", error);
      alert("Could not sign message.");
    }
  };

  const handleExchangeNonce = async () => {
    if (!nonce || !signature || !pubKey) {
      alert("Get nonce and sign message first!");
      return;
    }

    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nonce,
          fingerprint,
          sessionInfo: "test-session-info",
          walletAddress: pubKey.toBase58(),
          signedMessage: signature,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Session exchange failed");
      }

      const data = await response.json();
      setSessionToken(data.sessionToken);
      localStorage.setItem("sessionToken", data.sessionToken);
      alert("Session token received and stored in localStorage!");
    } catch (error: any) {
      console.error("Error exchanging nonce:", error);
      alert(`Error exchanging nonce: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Auth Test Component (Phantom)</h2>
      <p>Wallet Address: {pubKey ? pubKey.toBase58() : "Not Connected"}</p>
      <p>Nonce: {nonce || "Not Generated"}</p>
      <p>Signature: {signature || "Not Signed"}</p>
      <p>Session Token: {sessionToken || "Not Exchanged"}</p>

      <button onClick={handleConnectWallet} disabled={connected}>
        {connected ? "Connected to Phantom" : "Connect Phantom Wallet"}
      </button>
      <button onClick={handleGetNonce} disabled={!connected}>
        Get Nonce
      </button>
      <button onClick={handleSignMessage} disabled={!nonce}>
        Sign Message
      </button>
      <button onClick={handleExchangeNonce} disabled={!signature}>
        Exchange Nonce
      </button>

      {!walletAvail && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Phantom Wallet not detected. Please install Phantom Wallet.
        </p>
      )}

      {sessionToken && (
        <p style={{ color: "green", marginTop: "10px" }}>
          Session Token Stored in localStorage!
        </p>
      )}
    </div>
  );
};

export default AuthTest;
