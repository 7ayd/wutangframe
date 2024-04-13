import { ethers } from "ethers";
import fetch from "node-fetch";

// Function to decode Base64 strings
function decodeBase64(base64String: string): string {
    return Buffer.from(base64String, 'base64').toString('utf8');
}

// Function to extract the name from the JSON data
async function getCombinedWordFromToken(contractAddress: string, tokenId: number, provider: ethers.providers.Provider): Promise<string> {
    const abi = [
        "function tokenURI(uint256 tokenId) view returns (string memory)"
    ];

    // Initialize the contract
    const nftContract = new ethers.Contract(contractAddress, abi, provider);

    try {
        // Call the tokenURI function to get the URI
        const tokenUri: string = await nftContract.tokenURI(tokenId);

        // Check if the URI is a data URI or an external link
        if (tokenUri.startsWith("data:")) {
            // The URI is a Base64-encoded JSON
            const jsonPart = tokenUri.split(',')[1];
            const decodedJson = decodeBase64(jsonPart);
            const jsonData = JSON.parse(decodedJson);
            return jsonData.name;
        } else {
            // The URI points to an external resource; fetch it
            const response = await fetch(tokenUri);
            const jsonData = await response.json();
            return jsonData.name;
        }
    } catch (error) {
        console.error('Error fetching or parsing token URI:', error);
        throw error;
    }
}

// Example usage
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");  // Adjust for your Ethereum node
const contractAddress = "0xYourContractAddressHere";  // Replace with your contract's address
const tokenId = 1;  // Example token ID

getCombinedWordFromToken(contractAddress, tokenId, provider)
    .then(name => console.log("Combined Word:", name))
    .catch(error => console.error("Error:", error));