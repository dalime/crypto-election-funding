
# Technical Specification: Presidential Candidate Crowdfunding Web App

## Overview
The web app aims to facilitate crowdfunding for two presidential candidates in the 2024 election: Donald Trump and Kamala Harris. Users can donate ETH to support either candidate, with the funds and donation numbers tracked transparently on the blockchain. The app includes user management features to connect wallets, view previous donations, and display detailed information about each candidate.

## Key Features

### 1. Candidate Information Display
- **Layout**: Two columns, one for each candidate.
- **Content**:
  - **Photo**: A prominent image of the candidate.
  - **Details**: Name, political party, age, key points, and stance on cryptocurrency.
- **Donation Summary**:
  - **Vertical Bar Graph**: Visual representation of funds raised, with a green color indicating the amount. 
  - **Data Display**: Total amount raised (in ETH and USD) and the total number of donations.

### 2. Donation Form
- **Input**:
  - **Amount Input**: Text field to input the donation amount.
  - **Currency Switch**: Toggle to switch between ETH and USD input.
- **Action Button**: A button labeled "Support" to initiate the donation process.

### 3. User Management
- **Wallet Connection**:
  - Users can connect their wallet (e.g., MetaMask) to the web app.
  - The app will display a "Connect Wallet" button, changing to "Connected" once the wallet is linked.
- **My Contributions Tab**:
  - When a user connects their wallet, a "My Contributions" tab becomes available.
  - Clicking the "My Contributions" tab renders a component that displays a table of the user's past donations.

- **My Contributions Component**:
  - **Table Columns**:
    - **Timestamp**: When the donation was made.
    - **Recipient**: The candidate who received the donation.
    - **Amount (ETH)**: The amount of ETH donated.
    - **Amount (USD)**: The equivalent amount in USD.
    - **Wallet Address**: The candidate's wallet address to which the funds were sent.

### 4. Smart Contract Logic
- **Global Variables**:
  - `amountTrump`: Total amount of ETH raised for Trump.
  - `amountKamala`: Total amount of ETH raised for Kamala Harris.
  - `donationsTrump`: Number of donations made to Trump.
  - `donationsKamala`: Number of donations made to Kamala Harris.
  - `walletTrump`: Wallet address for receiving funds for Trump.
  - `walletKamala`: Wallet address for receiving funds for Kamala Harris.
- **Functions**:
  - `support(address candidate, uint256 amount)`: 
    - Accepts the candidate's address and the amount of ETH to be donated.
    - Increments the corresponding global variables (`amount` and `donations`) based on the candidate selected.
  - `readWalletAddress(string memory candidateName) public view returns (address)`: 
    - Returns the wallet address associated with the given candidate name.
  - `updateWalletAddress(string memory candidateName, address newWallet) public`: 
    - Updates the wallet address for the specified candidate. This function should only be callable by an authorized entity.

### 5. Real-Time Data Updates
- **Integration with The Graph**:
  - Use The Graph to index and query blockchain data.
  - Fetch and display up-to-date information on the funds raised and the number of donations for each candidate.

## Tech Stack

### Frontend
- **Framework**: Next.js, React
- **Language**: TypeScript
- **State Management**: React Context or Zustand
- **Styling**: CSS Modules or styled-components
- **Library for Blockchain Interaction**: Web3.js
- **GraphQL API for Blockchain Data**: The Graph
- **Wallet Integration**: Wagmi (with MetaMask)

### Smart Contracts
- **Development Environment**: Hardhat
- **Smart Contract Language**: Solidity
- **Contract Components**: Inspired by OpenZeppelin for security and best practices

## Technical Details

### User Interface (UI)
- **Responsiveness**: The web app will be fully responsive, ensuring a seamless user experience across devices (desktop, tablet, mobile).
- **Components**:
  - `CandidateCard`: Displays candidate photo, details, and donation summary.
  - `DonationForm`: Includes the amount input, currency switch, and support button.
  - `VerticalBarGraph`: Visualizes the funds raised for each candidate.
  - `MyContributions`: Displays a table of the user's past donations.

### Smart Contract
- **Security Considerations**:
  - Ensure the contract is audited and follows best practices to prevent vulnerabilities like reentrancy attacks.
  - Use OpenZeppelin’s SafeMath library for safe arithmetic operations.
  - `updateWalletAddress` should have access control to prevent unauthorized changes.

### Data Handling
- **Currency Conversion**: Convert USD to ETH using an external API (e.g., CoinGecko) at the time of the transaction.
- **Data Synchronization**: Utilize The Graph to keep the frontend updated with real-time blockchain data.

## User Flow

1. **Viewing Candidate Information**:
   - Users see detailed information about each candidate, including their cryptocurrency stance.
   - A vertical bar graph displays the current funding status for each candidate.

2. **Making a Donation**:
   - Users connect their wallet and enter an amount in ETH or USD using the donation form.
   - Upon clicking "Support," the app interacts with the user's Web3 wallet to process the transaction.

3. **Viewing My Contributions**:
   - After connecting their wallet, users can access the "My Contributions" tab to view a list of their past donations.

4. **Transaction Processing**:
   - The frontend sends the transaction details to the smart contract via Web3.js.
   - The smart contract updates the respective candidate's total amount and donation count.

5. **Updating the UI**:
   - The frontend fetches the latest data using The Graph, ensuring real-time updates of the donation statistics.

## Deployment

### Smart Contracts
- **Testnet Deployment**: Deploy contracts on a testnet (e.g., Rinkeby) for testing.
- **Mainnet Deployment**: Deploy contracts on the Ethereum mainnet for production.

### Frontend
- **Hosting**: Use platforms like Vercel or Netlify for hosting the Next.js application.
- **Domain**: Secure a domain name for the web app.

## Monitoring & Maintenance
- **Analytics**: Integrate tools like Google Analytics to monitor user interactions and app performance.
- **Error Handling**: Implement comprehensive error handling and user feedback mechanisms for transaction errors or network issues.

## Additional Considerations
- **Compliance**: Ensure compliance with relevant regulations, especially regarding political donations and cryptocurrency transactions.
- **Accessibility**: Design the app to be accessible to users with disabilities, following best practices for web accessibility.

This tech spec outlines the foundational elements and additional features needed to develop the crowdfunding web app for the presidential candidates, including user management and transparent tracking of donations. Further iterations and refinements may be made as development progresses.
