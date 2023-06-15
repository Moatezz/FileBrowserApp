import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';

const FileBrowser: React.FC = () => {
  const [fileContent, setFileContent] = useState('');

  const browseFiles = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
      });

      if (Array.isArray(res)) {
        const fileResponse: DocumentPickerResponse = res[0];
        const response = await fetch(fileResponse.uri);
        const content = await response.text();
        setFileContent(content);
      }
    } catch (error) {
      console.log('Error picking file:', error);
    }
  };

  return (
    <View>
      <Button title="Browse Files" onPress={browseFiles} />
      {fileContent && <Text>{fileContent}</Text>}
    </View>
  );
};

export default FileBrowser;
