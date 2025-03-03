# Finbase: Revolutionizing Finance with Voice-Powered AI and Blockchain Technology

## Overview

Finbase is a groundbreaking financial platform that combines cutting-edge AI voice technology with NEAR Protocol blockchain to create a truly user-owned financial ecosystem. By leveraging advanced voice synthesis and secure sound payment systems, Finbase enables intuitive, secure, and personalized financial interactions unlike anything in the market today.

## Technologies Used

- **Blockchain**: NEAR Protocol for decentralized transactions
- **AI Voice Synthesis**: ElevenLabs and Bitte AI
- **Frontend**: Next.js with TypeScript
- **Authentication**: Bitte AI wallet integration
- **Sound Transmission**: GGWave audio encoding
- **Media Capture**: ReCamera for secure visual identity verification

## Voice Technology Integration

### ElevenLabs Voice Synthesis

Finbase integrates ElevenLabs' state-of-the-art voice synthesis technology to create realistic, expressive AI agents that communicate with users through natural speech.

```typescript
/**
 * Configuration for ElevenLabs voice synthesis integration.
 * Defines parameters for voice generation quality and characteristics.
 */
interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  modelId: string;
  voiceSettings: {
    stability: number;    // Controls consistency (0.0-1.0)
    similarityBoost: number;  // Controls voice clarity (0.0-1.0)
  };
}

/**
 * Creates a voice response using the ElevenLabs API.
 * 
 * @param text - The text to convert to speech.
 * @param voiceType - The type of voice to use ('sender' or 'receiver').
 * @returns A Promise with the URL to the generated audio.
 */
export const createVoiceResponse = async (
  text: string, 
  voiceType: 'sender' | 'receiver' = 'default'
): Promise<string> => {
  try {
    const audioData = await textToSpeech(text, voiceType);
    const blob = new Blob([audioData], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error creating voice response:', error);
    throw error;
  }
};
```

### Bitte AI Integration

Finbase leverages Bitte AI for secure wallet authentication and user identity management, creating a seamless connection between financial operations and voice interfaces.

```typescript
/**
 * Initialize Bitte AI wallet connection.
 * 
 * @param accountId - The NEAR account ID for the user.
 * @param apiKey - The Bitte AI API key.
 * @returns A Promise with the wallet connection.
 */
export const initializeBitteWallet = async (
  accountId: string,
  apiKey: string
): Promise<BitteWalletConnection> => {
  try {
    const config = {
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      explorerUrl: 'https://explorer.mainnet.near.org',
      accountId: accountId,
      apiKey: apiKey,
    };
    
    return await BitteWallet.connect(config);
  } catch (error) {
    console.error('Failed to initialize Bitte wallet:', error);
    throw error;
  }
};
```

## ReCamera Integration for Visual Verification

Finbase incorporates ReCamera, a secure visual identity verification system that complements the voice authentication features. ReCamera provides an additional layer of security through facial recognition and liveness detection.

```typescript
/**
 * Configuration for ReCamera integration.
 */
interface ReCameraConfig {
  apiKey: string;
  verificationLevel: 'basic' | 'enhanced' | 'premium';
  features: string[];
  storageOptions: {
    temporary: boolean;
    encryptionEnabled: boolean;
    retentionDays: number;
  };
}

/**
 * ReCamera integration for visual identity verification.
 */
export class ReCameraVerification {
  private config: ReCameraConfig;
  private videoRef: React.RefObject<HTMLVideoElement>;
  
  /**
   * Creates a new ReCamera verification instance.
   * 
   * @param config - The ReCamera configuration options.
   * @param videoRef - Reference to the video element for camera stream.
   */
  constructor(config: ReCameraConfig, videoRef: React.RefObject<HTMLVideoElement>) {
    this.config = config;
    this.videoRef = videoRef;
  }
  
  /**
   * Initializes the camera stream for identity verification.
   * 
   * @returns A Promise resolving to true if successful, false otherwise.
   */
  async initialize(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 } 
        } 
      });
      
      if (this.videoRef.current) {
        this.videoRef.current.srcObject = stream;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error initializing camera:', error);
      return false;
    }
  }
  
  /**
   * Performs identity verification using facial recognition.
   * 
   * @param userId - The user ID to verify.
   * @returns A Promise with the verification result.
   */
  async verifyIdentity(userId: string): Promise<{
    success: boolean;
    confidence: number;
    verificationId: string;
  }> {
    try {
      // Capture image from video stream
      const canvas = document.createElement('canvas');
      canvas.width = this.videoRef.current?.videoWidth || 640;
      canvas.height = this.videoRef.current?.videoHeight || 480;
      
      const context = canvas.getContext('2d');
      if (context && this.videoRef.current) {
        context.drawImage(this.videoRef.current, 0, 0, canvas.width, canvas.height);
      }
      
      // Convert to base64 for API submission
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Send to ReCamera API (mock implementation)
      const response = await fetch('https://api.recamera.com/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          userId,
          image: imageData,
          verificationLevel: this.config.verificationLevel
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error verifying identity:', error);
      return {
        success: false,
        confidence: 0,
        verificationId: ''
      };
    }
  }
  
  /**
   * Releases camera resources when no longer needed.
   */
  release(): void {
    const stream = this.videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }
}
```

## AI Agent Constellation

Finbase's ecosystem features specialized AI agents, each with distinct personalities and roles:

```typescript
/**
 * Represents a voice-enabled AI agent in the Finbase ecosystem.
 */
interface VoiceAgent {
  name: string;
  voiceId: string;
  voiceProvider: 'ElevenLabs';
  role: 'sender' | 'receiver';
  capabilities: string[];
  voiceCharacteristics: {
    tone: string;
    personality: string;
  };
}

/**
 * Tasha: The financial guidance assistant who handles sending payments.
 */
const tasha: VoiceAgent = {
  name: 'Tasha',
  voiceId: process.env.NEXT_PUBLIC_TASHA_AGENT_ID || 'jINMktrkz7sMGfKHNRaX',
  voiceProvider: 'ElevenLabs',
  role: 'sender',
  capabilities: [
    'financial-advice',
    'transaction-narration',
    'payment-sending'
  ],
  voiceCharacteristics: {
    tone: 'Warm',
    personality: 'Professional Financial Mentor'
  }
};

/**
 * Zanna: The transaction verification agent who handles receiving payments.
 */
const zanna: VoiceAgent = {
  name: 'Zanna',
  voiceId: process.env.NEXT_PUBLIC_ZANNA_AGENT_ID || 'IE3LQ5S4FWsr9j0iqOwN',
  voiceProvider: 'ElevenLabs',
  role: 'receiver',
  capabilities: [
    'payment-verification',
    'security-confirmation',
    'transaction-authentication'
  ],
  voiceCharacteristics: {
    tone: 'Crisp',
    personality: 'Authoritative Security Expert'
  }
};
```

## Sound Payment Technology

One of Finbase's most innovative features is its sound payment system, which enables secure transactions through audio communication between devices:

```typescript
/**
 * Sound payment types and interfaces.
 */
export interface PaymentData {
  sender: string;
  recipient: string;
  amount: number;
  currency: string;
  reference?: string;
  timestamp: number;
  verificationWords?: string[]; // Array of random words for verification
}

/**
 * Sends a payment via sound.
 * 
 * @param paymentData - The payment data to transmit.
 * @returns A Promise resolving to true if successful, false otherwise.
 */
export async function sendSoundPayment(paymentData: PaymentData): Promise<boolean> {
  try {
    if (!await initAudio() || !context || !ggwave || !instance) {
      console.error('Failed to send payment: audio system not initialized');
      return false;
    }
    
    // Add sender ID, timestamp, and verification words
    const fullPaymentData: PaymentData = {
      ...paymentData,
      sender: paymentData.sender || deviceId,
      timestamp: Date.now(),
      verificationWords: generateVerificationWords()
    };
    
    // Prepare the data string with device ID prefix to avoid feedback loops
    const paymentStr = `${deviceId}$${JSON.stringify(fullPaymentData)}`;
    
    // Encode data as sound
    const waveform = ggwave.encode(
      instance,
      paymentStr,
      ggwave.ProtocolId.GGWAVE_PROTOCOL_AUDIBLE_FAST,
      10  // Volume level
    );

    // Play the encoded sound
    const buf = convertTypedArray(waveform, Float32Array);
    const buffer = context.createBuffer(1, buf.length, context.sampleRate);
    buffer.getChannelData(0).set(buf);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);

    // Emit event for sent payment
    soundPaymentEmitter.emit('paymentSent', fullPaymentData);
    
    // Return promise that resolves when sound finishes playing
    return new Promise<boolean>(resolve => {
      source.onended = () => {
        console.log('Payment sound transmission complete');
        resolve(true);
      };
    });
  } catch (error) {
    console.error('Failed to send payment via sound:', error);
    return false;
  }
}
```

### Voice-Powered Verification

```typescript
/**
 * Handles the confirmation of a payment using voice input.
 * 
 * This function prompts the user to say "confirm" to complete the transaction
 * and uses the Web Speech API for voice recognition.
 */
const handleVoiceConfirmation = async (): Promise<void> => {
  if (!lastReceivedPayment) return;
  
  try {
    // Zanna requests verbal confirmation
    const requestConfirmation = "Please say 'confirm' to complete this transaction.";
    await playAiVoice(requestConfirmation, 'receiver');
    
    // Set up speech recognition
    const SpeechRecognitionAPI = (
      window.SpeechRecognition || 
      window.webkitSpeechRecognition
    ) as typeof SpeechRecognition;
    
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    
    // Start listening for the confirmation command
    recognition.start();
    setIsListeningForConfirmation(true);
    
    // Process speech recognition results
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      
      // Complete transaction if user says "confirm"
      if (transcript.includes('confirm')) {
        confirmVerificationWords();
      } else {
        // Prompt user to try again
        playAiVoice("I didn't hear 'confirm'. Please try again.", 'receiver');
      }
    };
  } catch (error) {
    console.error('Error in voice confirmation:', error);
    // Fallback to button confirmation
  }
};
```

## Complete SoundPayment Component

The SoundPayment component is the core of Finbase's audio transaction system:

```typescript
/**
 * SoundPayment component for handling audio-based cryptocurrency transactions.
 * 
 * This component enables payments via sound waves with AI voice assistants
 * to guide the sender and recipient through the transaction process.
 */
const SoundPayment: React.FC<SoundPaymentProps> = ({
  defaultAmount = '',
  defaultRecipient = '',
  walletAddress = '',
  onPaymentSent,
  onPaymentReceived
}) => {
  // State for tracking payment and UI status
  const [isRecording, setIsRecording] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [lastReceivedPayment, setLastReceivedPayment] = useState<PaymentData | null>(null);
  const [lastSentPayment, setLastSentPayment] = useState<PaymentData | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'confirming' | 'confirmed' | 'failed'>('idle');
  
  // AI conversation state
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<'sender' | 'receiver' | null>(null);
  const [aiConversationActive, setAiConversationActive] = useState(false);
  const [conversationLog, setConversationLog] = useState<{role: 'sender' | 'receiver' | 'user'; text: string}[]>([]);
  const [isListeningForConfirmation, setIsListeningForConfirmation] = useState(false);
  
  // Initialization logic...
  
  /**
   * Sends a payment via sound with AI conversation.
   */
  const handleSendPayment = async () => {
    if (!amount || !recipient) {
      alert('Please enter amount and recipient');
      return;
    }
    
    setIsTransmitting(true);
    
    try {
      // Create the payment data
      const payment: PaymentData = {
        sender: walletAddress || 'user.near',
        recipient: recipient,
        amount: parseFloat(amount),
        currency: 'NEAR',
        timestamp: Date.now(),
        verificationWords: generateVerificationWords()
      };
      
      // Send the sound payment
      const success = await sendSoundPayment(payment);
      
      if (!success) {
        throw new Error('Payment transmission failed');
      }
      
      // Set the last sent payment for display
      setLastSentPayment(payment);
      
      // For demonstration/testing on a single device, simulate both sides of conversation
      if (process.env.NODE_ENV === 'development') {
        await simulateWalletToWalletConversation(payment);
      }
      
    } catch (error) {
      console.error('Error sending payment:', error);
      alert('Error sending payment: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsTransmitting(false);
    }
  };
  
  // Return the component JSX...
};
```

## Bitte AI Wallet Integration

Finbase leverages Bitte AI's wallet integration for secure authentication:

```typescript
/**
 * Custom React hook for using the Bitte wallet.
 * 
 * @returns The wallet interface and connection state.
 */
export const useBitteWallet = () => {
  const [selector, setSelector] = useState<BitteWalletSelector | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<BitteAccount | null>(null);
  
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const apiKey = process.env.BITTE_API_KEY;
        if (!apiKey) {
          throw new Error('Bitte API key not found');
        }
        
        // Initialize wallet selector
        const selector = await BitteWalletSelector.init({
          network: 'mainnet',
          apiKey: apiKey,
          modules: [
            new BitteWalletModule(),
            new NearWalletModule(),
            new MyNearWalletModule()
          ]
        });
        
        setSelector(selector);
        
        // Check for existing connection
        const state = selector.store.getState();
        const wallet = await selector.wallet();
        
        if (state.accounts.length > 0) {
          setIsConnected(true);
          setCurrentAccount(state.accounts[0]);
          
          // Subscribe to account changes
          const subscription = selector.store.observable.subscribe((state) => {
            if (state.accounts.length > 0) {
              setIsConnected(true);
              setCurrentAccount(state.accounts[0]);
            } else {
              setIsConnected(false);
              setCurrentAccount(null);
            }
          });
          
          return () => subscription.unsubscribe();
        }
      } catch (error) {
        console.error('Error initializing Bitte wallet:', error);
      }
    };
    
    initializeWallet();
  }, []);
  
  return { selector, isConnected, currentAccount };
};
```

## Multi-Factor Authentication with ReCamera and Voice

Finbase employs a robust multi-factor authentication system combining ReCamera visual verification with voice recognition:

```typescript
/**
 * MultiFactorAuth component that combines ReCamera visual verification
 * with voice recognition for enhanced security.
 */
const MultiFactorAuth: React.FC<{
  onAuthComplete: (success: boolean) => void;
  userId: string;
}> = ({ onAuthComplete, userId }) => {
  const [authStage, setAuthStage] = useState<'initial' | 'visual' | 'voice' | 'complete'>('initial');
  const [visualVerified, setVisualVerified] = useState(false);
  const [voiceVerified, setVoiceVerified] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reCameraRef = useRef<ReCameraVerification | null>(null);
  
  // Initialize ReCamera
  useEffect(() => {
    if (videoRef.current && authStage === 'visual') {
      const reCameraConfig: ReCameraConfig = {
        apiKey: process.env.RECAMERA_API_KEY || '',
        verificationLevel: 'enhanced',
        features: ['liveness-detection', 'facial-recognition'],
        storageOptions: {
          temporary: true,
          encryptionEnabled: true,
          retentionDays: 1
        }
      };
      
      reCameraRef.current = new ReCameraVerification(reCameraConfig, videoRef);
      reCameraRef.current.initialize();
    }
    
    return () => {
      if (reCameraRef.current) {
        reCameraRef.current.release();
      }
    };
  }, [authStage]);
  
  /**
   * Begins the multi-factor authentication process.
   */
  const startAuthentication = () => {
    setAuthStage('visual');
  };
  
  /**
   * Handles the visual verification step with ReCamera.
   */
  const handleVisualVerification = async () => {
    if (!reCameraRef.current) return;
    
    const result = await reCameraRef.current.verifyIdentity(userId);
    
    if (result.success && result.confidence > 0.85) {
      setVisualVerified(true);
      setAuthStage('voice');
    } else {
      alert('Visual verification failed. Please try again.');
    }
  };
  
  /**
   * Handles the voice verification step.
   */
  const handleVoiceVerification = async () => {
    try {
      // Request the user to speak a verification phrase
      const verificationPhrase = "My voice is my password, verify me";
      
      // Set up speech recognition
      const SpeechRecognitionAPI = (
        window.SpeechRecognition || 
        window.webkitSpeechRecognition
      ) as typeof SpeechRecognition;
      
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'en-US';
      recognition.start();
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        
        // Simple verification - in a real app, you'd use voice biometrics
        if (transcript.includes('voice') && transcript.includes('password')) {
          setVoiceVerified(true);
          setAuthStage('complete');
          onAuthComplete(true);
        } else {
          alert('Voice verification failed. Please try again.');
        }
      };
    } catch (error) {
      console.error('Error in voice verification:', error);
      alert('Voice verification failed. Please try again.');
    }
  };
  
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Multi-Factor Authentication</h2>
      
      {authStage === 'initial' && (
        <button
          onClick={startAuthentication}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Begin Authentication
        </button>
      )}
      
      {authStage === 'visual' && (
        <div className="flex flex-col items-center">
          <div className="border-4 border-blue-400 rounded-lg mb-4">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="w-80 h-60"
            />
          </div>
          <p className="text-gray-700 mb-4">
            Position your face within the frame for visual verification.
          </p>
          <button
            onClick={handleVisualVerification}
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Verify Identity
          </button>
        </div>
      )}
      
      {authStage === 'voice' && (
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mic className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-gray-700 mb-4">
            Please say: "My voice is my password, verify me"
          </p>
          <button
            onClick={handleVoiceVerification}
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Begin Voice Verification
          </button>
        </div>
      )}
      
      {authStage === 'complete' && (
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <p className="text-gray-700 mb-4">
            Authentication complete. You have been successfully verified.
          </p>
        </div>
      )}
    </div>
  );
};
```

## Technical Architecture

Finbase is built on a modern, scalable architecture combining multiple cutting-edge technologies:

### Core Components

```typescript
/**
 * Main application architecture.
 */
interface FinbaseArchitecture {
  blockchain: {
    provider: 'NEAR Protocol';
    networkId: 'mainnet' | 'testnet';
    contractId: string;
  };
  voiceProviders: {
    primary: 'ElevenLabs';
    secondary: 'Bitte AI';
  };
  authentication: {
    provider: 'Bitte Wallet';
    methods: ['wallet', 'email', 'social'];
    visualVerification: 'ReCamera';
  };
  soundTechnology: {
    provider: 'GGWave';
    protocols: {
      transmission: 'GGWAVE_PROTOCOL_AUDIBLE_FAST';
      verification: 'VerificationWords';
    };
  };
  aiAgents: VoiceAgent[];
}

/**
 * The Finbase platform configuration.
 */
const finbasePlatform: FinbaseArchitecture = {
  blockchain: {
    provider: 'NEAR Protocol',
    networkId: 'mainnet',
    contractId: 'finance.near'
  },
  voiceProviders: {
    primary: 'ElevenLabs',
    secondary: 'Bitte AI'
  },
  authentication: {
    provider: 'Bitte Wallet',
    methods: ['wallet', 'email', 'social'],
    visualVerification: 'ReCamera'
  },
  soundTechnology: {
    provider: 'GGWave',
    protocols: {
      transmission: 'GGWAVE_PROTOCOL_AUDIBLE_FAST',
      verification: 'VerificationWords'
    }
  },
  aiAgents: [tasha, zanna]
};
```

## Future Roadmap

Finbase has an ambitious roadmap for enhancing its voice and visual technology capabilities:

1. **Enhanced ReCamera Integration** for biometric authentication during high-value transactions
2. **Advanced Bitte AI Integration** for more seamless wallet authentication
3. **Custom voice model training** for personalized financial assistants
4. **Advanced emotion detection** to adjust responses based on user sentiment
5. **Expanded language support** for global financial inclusion

## Platform Differentiators

- **User-owned AI**: Data and AI resources controlled by users, not a central authority
- **Voice-first design**: Natural voice interaction as the primary interface
- **Multi-factor biometric security**: Combined visual (ReCamera) and voice verification
- **Blockchain foundation**: Secure, transparent, and decentralized financial operations
- **Cross-device compatibility**: Works across multiple platforms through audio communication

## Connect with Finbase

**Website**: [ai.finbase.cloud](https://ai.finbase.cloud)  
**Technology Stack**: User-Owned AI + ElevenLabs Voice Synthesis + NEAR Protocol + Bitte AI + ReCamera  
**Vision**: Creating a more accessible, intuitive financial ecosystem through voice-powered AI

---

*Finbase: Where your financial future speaks for itself.*






# Bitte AI Agent NextJS Template

This template provides a starting point for creating AI agents using the Bitte Protocol with Next.js. It includes pre-configured endpoints and tools that demonstrate common agent functionalities.

## Features

- 🤖 Pre-configured AI agent setup
- 🛠️ Built-in tools and endpoints:
  - Blockchain information retrieval
  - NEAR transaction generation
  - Reddit frontpage fetching
  - Twitter share intent generation
  - Coin flip functionality
- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 📝 TypeScript support
- 🔄 Hot reload development environment

## Quick Start

1. Clone this repository
2. Configure environment variables (create a `.env` or `.env.local` file)

```bash
# Get your API key from https://key.bitte.ai
BITTE_API_KEY='your-api-key'

ACCOUNT_ID='your-account.near'
```

3. Install dependencies:

```bash
pnpm install
```

4. Start the development server:

```bash
pnpm run dev
```

This will:

- Start your Next.js application
- Launch make-agent
- Prompt you to sign a message in Bitte wallet to create an API key
- Launch your agent in the Bitte playground
- Allow you to freely edit and develop your code in the playground environment

5. Build the project locally:

```bash
pnpm run build:dev
```

This will build the project and not trigger `make-agent deploy`

- using just `build` will trigger make-agent deploy and not work unless you provide your deployed plugin url using the `-u` flag.

## Available Tools

The template includes several pre-built tools:

### 1. Blockchain Information

- Endpoint: `/api/tools/get-blockchains`
- Returns a randomized list of blockchain networks

### 2. NEAR Transaction Generator

- Endpoint: `/api/tools/create-near-transaction`
- Creates NEAR transaction payloads for token transfers

### 3. EVM Transaction Generator

- Endpoint: `/api/tools/create-evm-transaction`
- Creates EVM transaction payloads for native eth transfers

### 4. Twitter Share

- Endpoint: `/api/tools/twitter`
- Generates Twitter share intent URLs

### 5. Coin Flip

- Endpoint: `/api/tools/coinflip`
- Simple random coin flip generator

### 6. Get User

- Endpoint: `/api/tools/get-user`
- Returns the user's account ID

## AI Agent Configuration

The template includes a pre-configured AI agent manifest at `/.well-known/ai-plugin.json`. You can customize the agent's behavior by modifying the configuration in `/api/ai-plugins/route.ts`. This route generates and returns the manifest object.

## Deployment

1. Push your code to GitHub
2. Deploy to Vercel or your preferred hosting platform
3. Add your `BITTE_API_KEY` to the environment variables
4. The `make-agent deploy` command will automatically run during build

## Making your own agent

Whether you want to add a tool to this boilerplate or make your own standalone agent tool, here's you'll need:

1. Make sure [`make-agent`](https://github.com/BitteProtocol/make-agent) is installed in your project:

```bash
pnpm install --D make-agent
```

2. Set up a manifest following the OpenAPI specification that describes your agent and its paths.
3. Have an api endpoint with the path `GET /api/ai-plugin` that returns your manifest

## Setting up the manifest

Follow the [OpenAPI Specification](https://swagger.io/specification/#schema-1) to add the following fields in the manifest object:

- `openapi`: The OpenAPI specification version that your manifest is following. Usually this is the latest version.
- `info`: Object containing information about the agent, namely its 'title', 'description' and 'version'.
- `servers`: Array of objects containing the urls for the deployed instances of the agent.
- `paths`: Object containing all your agent's paths and their operations.
- `"x-mb"`: Our custom field, containing the account id of the owner and an 'assistant' object with the agent's metadata, namely the tools it uses, and additional instructions to guide it.

## Learn More

- [Bitte Protocol Documentation](https://docs.bitte.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAPI Specification](https://swagger.io/specification/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
