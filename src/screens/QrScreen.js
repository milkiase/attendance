import {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import { useDispatch, useSelector } from 'react-redux';
import { attendStudent } from '../store/students/studentsSlice';
import { useNavigation } from '@react-navigation/native';
import { selectStudents } from '../store/students/studentsSelector';
import { updateStudent } from '../utils/Firebase.utils';

export default function QrScreen() {
    const dispatch = useDispatch()
    const students = useSelector(selectStudents)
    const navigation = useNavigation()
    const [hasPermission, setHasPermission] = useState(false)

    const askPermission = async()=>{
      const status = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status.granted)
    }
    useEffect(()=>{
      askPermission()
    }, [])
    const handleBarcodeScan = async(params)=>{
      try {
        const targetStudent = students.find((student)=>student.id === params.data)
        await updateStudent({...targetStudent, hasAttended: true})
        dispatch(attendStudent({id:params.data}))
        navigation.navigate('List')
      } catch (error) {
        console.log('error scanning student', error)
      }

    }

  return (
    <View style={styles.container}>
      {!hasPermission ? <View>
        <Text>Please allow permission.</Text> 
        <Button title='Ask Again' onPress={askPermission}/>
      </View>:
      <View>
        <BarCodeScanner style={styles.barCodeScanner} 
          onBarCodeScanned={handleBarcodeScan}
        ></BarCodeScanner>
        
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barCodeScanner: {
    height: 500,
    width: 300,
    marginBottom: 10
  }
});
