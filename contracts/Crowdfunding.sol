// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PresidentialCrowdfunding {
  // Struct to store support details
  struct SupportDetails {
    uint256 trumpAmount;
    uint256 trumpNum;
    uint256 kamalaAmount;
    uint256 kamalaNum;
  }

  uint256 public amountTrump; // Amount raised for Trump
  uint256 public amountKamala; // Amount raised for Kamala
  uint256 public numTrump; // Number of donations for Trump
  uint256 public numKamala; // Number of donations for Kamala

  address public walletTrump; // Wallet address for Trump
  address public walletKamala; // Wallet address for Kamala

  address public owner;

  event Support(
    string indexed candidateName,
    uint256 amount,
    uint256 numDonations
  );

  constructor(address _walletTrump, address _walletKamala) {
    walletTrump = _walletTrump;
    walletKamala = _walletKamala;
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function.");
    _;
  }

  /**
   * @dev Support a candidate by donating to their campaign
   * @param candidateName Name of the candidate
   */
  function support(string memory candidateName) public payable {
    require(msg.value > 0, "Donation must be greater than zero.");

    if (
      keccak256(abi.encodePacked(candidateName)) ==
      keccak256(abi.encodePacked("Trump"))
    ) {
      amountTrump += msg.value;
      numTrump += 1;
      emit Support("Trump", amountTrump, numTrump);
      payable(walletTrump).transfer(msg.value);
    } else if (
      keccak256(abi.encodePacked(candidateName)) ==
      keccak256(abi.encodePacked("Kamala"))
    ) {
      amountKamala += msg.value;
      numKamala += 1;
      payable(walletKamala).transfer(msg.value);
      emit Support("Kamala", amountKamala, numKamala);
    } else {
      revert("Invalid candidate name.");
    }
  }

  /**
   * @dev Read the support details
   * @return SupportDetails struct
   */
  function readDetails() public view returns (SupportDetails memory) {
    return SupportDetails(amountTrump, numTrump, amountKamala, numKamala);
  }

  /**
   * @dev Read the wallet address for a candidate
   * @param candidateName Name of the candidate
   * @return address The wallet address
   */
  function readWalletAddress(
    string memory candidateName
  ) public view returns (address) {
    if (
      keccak256(abi.encodePacked(candidateName)) ==
      keccak256(abi.encodePacked("Trump"))
    ) {
      return walletTrump;
    } else if (
      keccak256(abi.encodePacked(candidateName)) ==
      keccak256(abi.encodePacked("Kamala"))
    ) {
      return walletKamala;
    } else {
      revert("Invalid candidate name.");
    }
  }

  /**
   * @dev Update the wallet address for a candidate
   * @param candidateName Name of the candidate
   * @param newWalletAddress New wallet address
   */
  function updateWalletAddress(
    string memory candidateName,
    address newWalletAddress
  ) public onlyOwner {
    if (
      keccak256(abi.encodePacked(candidateName)) ==
      keccak256(abi.encodePacked("Trump"))
    ) {
      walletTrump = newWalletAddress;
    } else if (
      keccak256(abi.encodePacked(candidateName)) ==
      keccak256(abi.encodePacked("Kamala"))
    ) {
      walletKamala = newWalletAddress;
    } else {
      revert("Invalid candidate name.");
    }
  }

  /**
   * @dev Receive function to accept ETH donations directly
   */
  receive() external payable {
    support("Trump"); // Default to Trump
  }

  /**
   * @dev Fallback function to handle non-existent function calls
   */
  fallback() external payable {
    support("Trump"); // Default to Trump
  }
}
