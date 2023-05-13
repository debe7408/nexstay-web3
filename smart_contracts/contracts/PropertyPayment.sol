//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PropertyPayment {
    address public owner;
    IERC20 public token;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    event PaymentReceived(address indexed payer, uint256 amount);

    constructor(address _token) public {
        owner = msg.sender;
        token = IERC20(_token);
    }

    function pay(uint256 amount) external {
        require(amount > 0, "Payment amount must be greater than zero.");
        token.transferFrom(msg.sender, owner, amount);
        emit PaymentReceived(msg.sender, amount);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid owner address");
        owner = _newOwner;
    }

    function setTokenAddress(address _newToken) external onlyOwner {
        require(_newToken != address(0), "Invalid Token address");
        token = IERC20(_newToken);
    }
}
