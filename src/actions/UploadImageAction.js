import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import storage from '@react-native-firebase/storage';
import {
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';


export function UploadImageAction(props)  {
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
    },
  };

  launchImageLibrary(options, (response) => {
    if (response["didCancel"] !== true) { // 뒤로가기 시 에러 처리
        console.log(1111)
        const source = response['assets'][0]['uri']; // 취소 시 여기서 여기서 에러 발생 (값이 제대로 저장되지 않아서)
        const filename = source.substring(source.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? source.replace('file://', '') : source;
    
        const task = storage()
          .ref('Users/'+ auth().currentUser.email) // storage에 저장될 경로
          .putFile(uploadUri); // 보낼 이미지의 경로
        // set progress state
        task.on('state_changed', taskSnapshot => {
          console.log(taskSnapshot.state);
        });
        task.then(() => {
          console.log('Task complete');
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  })
  return 
}