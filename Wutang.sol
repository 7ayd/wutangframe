// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

//OpenZeppelin contracts for ERC721. We dont need to write the contracts by hand but we can if we wanted to to make it more efficent if possible i.e. ERC721A.
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    constructor() ERC721("Wu-Tang On Chain", "Wu-Tang On Chain") {}

    string firstName;
    string secondName;
    uint256 _tokenIds;
    uint256 public _maxNFTs = 20000;
    uint public mintFee = 0.0015 ether;

    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string wutangSVG =
        "</text><svg xmlns='http://www.w3.org/2000/svg' x='20' y='20' width='100' height='100' viewBox='0 0 300 271'><path fill='#FFBF00' d='M215.5 21.1c-22.6 11.1-44.3 21.6-48.4 23.5l-7.4 3.4 4.4 3.2c16.9 12.2 22.8 26.6 16.3 39.6-2.3 4.7-11.4 14.2-13.5 14.2-1.2 0-1.2-.1.6-4.3 2.1-5 1.9-14.3-.4-19.4-2-4.2-9.4-12.3-11.5-12.3-.6 0-8.4 3.4-17.3 7.6-16.4 7.8-18.4 9.5-12.2 10.8 4.2.8 7.2 5.9 6.5 11.2-.6 5.1-3.5 12.4-4.8 12.4-1.7 0-12.6-11.1-15.7-15.9-4.6-7.1-6.6-16.1-5.3-23.9 1.2-6.9 5.6-17.2 9.7-22.6l2.5-3.4-14.7-4.1c-8.2-2.2-29.1-8.1-46.6-13l-31.8-8.8-2.4 3.6C11.3 42.3 1 82.1 1 110.2c0 71.2 40.3 115.4 117 128.3 9.3 1.6 42 3.3 42 2.3 0-.3-2.7-6.1-6-12.9-15.3-31.9-16.9-52.6-4.8-60.7 3.2-2.1 5.2-2.6 10.2-2.6 11.5 0 18.7 5.6 22.2 17 1.6 5.5 1.8 22.5.4 32.9-1.9 12.8-9.6 41.5-14.5 53.7-.5 1.3 1.5.8 9.7-2.2 34.1-12.5 60.6-28.2 81.4-48.2 47.1-45.4 53.2-109.3 17.4-183.3-4.2-8.7-16.8-30.6-18.8-32.7-.4-.4-19.2 8.3-41.7 19.3'/></svg></svg>";
    string[] firstWords = [
        "Insane ",
        "Dirty ",
        "Big Baby ",
        "Tha ",
        "B-loved ",
        "E-ratic ",
        "Irate ",
        "Respected ",
        "Cyber ",
        "Crypto ",
        "Thunderous ",
        "Childish ",
        "Ol' ",
        "Based",
        "Childish"
    ];
    string[] secondWords = [
        "Mastermind",
        "Prodigy",
        "Warrior",
        "Madman",
        "Killah",
        "Swami",
        "Punk",
        "MFer",
        "Observer",
        "Overlord",
        "Ape",
        "Viking",
        "Mogul",
        "Degen",
        "Fren",
        "Gambino",
        "Remilio",
        "MiLady"
    ];

    function pickRandomFirstWord(
        string calldata name
    ) internal view returns (string memory) {
        uint256 rand = uint256(
            keccak256(abi.encodePacked(blockhash(block.number - 1), name))
        );
        rand = rand % firstWords.length;
        return firstWords[rand];
    }

    function pickRandomSecondWord(
        string calldata name
    ) internal view returns (string memory) {
        uint256 rand = uint256(
            keccak256(abi.encodePacked(blockhash(block.number - 1), name))
        );
        rand = rand % secondWords.length;
        return secondWords[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function makeNFT(
        string calldata _firstName,
        string calldata _lastName
    ) public payable {
        require(msg.value >= mintFee, "Insufficient funds to mint.");
        uint256 newItemID = _tokenIds;

        string memory first = pickRandomFirstWord(_firstName);
        string memory second = pickRandomSecondWord(_lastName);
        string memory combinedWord = string(
            abi.encodePacked(first, " ", second)
        );

        string memory finalSvg = string(
            abi.encodePacked(baseSvg, combinedWord, wutangSVG)
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '", "description": "Wu-Tang name", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, newItemID);

        _setTokenURI(newItemID, finalTokenUri);

        ++_tokenIds;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function changeMintFee(uint256 _newFee) external onlyOwner {
        mintFee = _newFee;
    }
}
