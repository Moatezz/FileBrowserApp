import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {RSAKeychain} from 'react-native-rsa-native';
import {writeFile, DocumentDirectoryPath} from 'react-native-fs'; // Assuming you're using react-native-fs for file operations

const Encryption: React.FC = () => {
  const [encryptedContent, setEncryptedContent] = useState('');
  const [decryptedContent, setDecryptedContent] = useState('');

  const encryptContent = async (content: string) => {
    try {
      const keyTag = 'your-key-tag'; // Replace with your actual key tag

      // Retrieve the public key
      const publicKey = await RSAKeychain.getPublicKey('fuck');
      console.log('Public key ', publicKey);
      if (!publicKey) {
        console.log('Public key is null');
        return;
      }

      // Encrypt the content
      const encrypted = await RSAKeychain.encrypt(content, publicKey);
      if (!encrypted) {
        console.log('Encryption failed');
        return;
      }

      // Save the encrypted content to a file
      const filePath = `${DocumentDirectoryPath}/encrypted.txt`;
      await writeFile(filePath, encrypted, 'utf8');

      console.log('File encryption successful');
      setEncryptedContent(encrypted);
    } catch (error) {
      // console.log('Error encrypting content:', error);
      return;
    }
  };

  const decryptContent = async (encrypted: string) => {
    try {
      const privateKey = await RSAKeychain.decrypt(encrypted, 'your_private_key_tag_here');
      setDecryptedContent(privateKey);
    } catch (error) {
      console.log('Error decrypting content:', error);
    }
  };

  return (
    <View>
      <Button title="Encrypt Content" onPress={() => encryptContent('Hello, World!')} />
      {encryptedContent && <Text>{encryptedContent}</Text>}
      <Button title="Decrypt Content" onPress={() => decryptContent(encryptedContent)} />
      {decryptedContent && <Text>{decryptedContent}</Text>}
    </View>
  );
};

export default Encryption;
