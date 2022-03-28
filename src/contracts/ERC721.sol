// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC165.sol";
import "./interfaces/IERC721.sol";
import "./libraries/Counters.sol";

contract ERC721 is ERC165, IERC721 {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    mapping(uint256 => address) private _tokenOwner; //mapping from token id to token owner
    mapping(address => Counters.Counter) private _ownedTokensCount; // mapping from token owner to no of tokens

    // Mapping from token id to approved addresses
    mapping(uint256 => address) private _tokenApprovals;

    constructor() {
        _registerInterface(
            bytes4(
                keccak256("balanceOf(byte4)") ^
                    keccak256("ownerOf(bytes4)") ^
                    keccak256("transferFrom(bytes4)") ^
                    keccak256("approve(bytes4)") ^
                    keccak256("getApproved(bytyes4)")
            )
        );
    }

    function _tokenExists(uint256 tokenId) internal view returns (bool) {
        return _tokenOwner[tokenId] != address(0);
    }

    function balanceOf(address _owner) public view override returns (uint256) {
        require(_owner != address(0), "ERC721: Owner can not be zero address");

        return _ownedTokensCount[_owner].current();
    }

    function ownerOf(uint256 _tokenId) public view override returns (address) {
        require(_tokenExists(_tokenId), "ERC721: invalid token Id");

        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), "ERC721: Owner can not be zero address");
        return owner;
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: minting to zero address");
        require(
            _tokenOwner[tokenId] == address(0),
            "ERC721: Token already exists/minted"
        );

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to].increment();

        emit Transfer(address(0), to, tokenId);
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        require(
            _to != address(0),
            "Error - ERC721 Transfer to the zero address"
        );
        require(
            ownerOf(_tokenId) == _from,
            "Trying to transfer a token the address does not own!"
        );

        approve(address(0), _tokenId); // changing approval of the token to zero address before trnasfer
        _ownedTokensCount[_from].decrement();
        _ownedTokensCount[_to].increment();

        _tokenOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override {
        require(isApprovedOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);
    }

    function approve(address _to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);

        require(msg.sender == owner, "current caller is not owner");
        require(_to != owner, "Error- Approval to current owner");

        _tokenApprovals[tokenId] = _to;

        emit Approval(owner, _to, tokenId);
    }

    function getApproved(uint256 _tokenId)
        public
        view
        override
        returns (address)
    {
        require(_tokenExists(_tokenId), "Error- token does not exist");

        return _tokenApprovals[_tokenId];
    }

    function isApprovedOrOwner(address spender, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        require(_tokenExists(_tokenId), "Error- token does not exist");

        address owner = ownerOf(_tokenId);
        address approved = getApproved(_tokenId);

        return (spender == owner || spender == approved);
    }
}
