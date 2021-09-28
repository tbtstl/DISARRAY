// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.5;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Disarray is ERC721Enumerable {
    address public owner;
    uint256 public maxSupply;
    mapping(uint256 => address) public tokenCreators;
    string[] private tokenDataIndex;
    // bytes4(keccak256("royaltyInfo(uint256,uint256)")) == 0x2a55205a
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }

    constructor() ERC721("DISARRAY", "DISARRAY") {
        owner = msg.sender;
        maxSupply = 10000;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable) returns (bool) {
        return interfaceId == _INTERFACE_ID_ERC2981 || super.supportsInterface(interfaceId);
    }

    // Enforce a 10% royalty fee for creators, when EIP2981 is supported
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        return (tokenCreators[_tokenId], (_salePrice / 10));
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return tokenDataIndex[_tokenId];
    }

    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        require(_maxSupply > totalSupply(), "must be greater than current total supply");

        maxSupply = _maxSupply;
    }

    function setOwner(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }

    function mint(address _to, string memory _data) public {
        uint256 tokenId = totalSupply();
        require(tokenId < maxSupply, "max supply reached");

        tokenDataIndex.push(_data);
        tokenCreators[tokenId] = msg.sender;

        _safeMint(_to, tokenId);
    }
}
