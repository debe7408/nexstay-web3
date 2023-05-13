//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PropertyPayment {
    address public owner;
    IERC20 public token;
    uint256 public feePercentage;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    event PaymentReceived(
        address indexed payer,
        address receiver,
        uint256 amount
    );

    constructor(address _token, uint256 _feePercentage) {
        require(_feePercentage <= 100, "Invalid fee percentage");
        owner = msg.sender;
        token = IERC20(_token);
        feePercentage = _feePercentage;
    }

    function pay(uint256 amount, address propertyOwner) external {
        require(amount > 0, "Payment amount must be greater than zero.");

        uint256 feeAmount = (amount * feePercentage) / 100;
        uint256 propertyOwnerAmount = amount - feeAmount;

        token.transferFrom(msg.sender, owner, feeAmount);
        token.transferFrom(msg.sender, propertyOwner, propertyOwnerAmount);

        emit PaymentReceived(msg.sender, propertyOwner, amount);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid owner address");
        owner = _newOwner;
    }

    function setTokenAddress(address _newToken) external onlyOwner {
        require(_newToken != address(0), "Invalid Token address");
        token = IERC20(_newToken);
    }

    function setFeePercentage(uint256 _newFeePercentage) external onlyOwner {
        require(_newFeePercentage <= 100, "Invalid fee percentage");
        feePercentage = _newFeePercentage;
    }
}
