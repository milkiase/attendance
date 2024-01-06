import React, { useEffect, useLayoutEffect, useState } from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { Button, CheckBox, Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { selectStudents } from '../store/students/studentsSelector';
import { FlatList, } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { attendStudent, setStudents } from '../store/students/studentsSlice';
import { useNavigation } from '@react-navigation/native';
import { createStudents, fetchStudents } from '../utils/Firebase.utils';
import { updateStudent } from '../utils/Firebase.utils';
import Spinner from 'react-native-loading-spinner-overlay';
import {Feather} from '@expo/vector-icons'
// import DatePicker from 'react-native-date-picker';
// import DatePicker from "expo-datepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from "@expo/vector-icons";

const ListScreen = () => {

    const {navigate, setOptions} = useNavigation()
    const dispatch = useDispatch()
    const students = useSelector(selectStudents)
    const [loading, setLoading] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(()=>{
        const loadStudents = async()=>{
            const fetchedStudents = await fetchStudents()
            console.log(fetchedStudents)
            dispatch(setStudents(fetchedStudents))
        }
        loadStudents()
    }, [])

    const handleCheckPress = async(newStudent)=>{
        setLoading(true)
        try {
            await updateStudent({...newStudent, hasAttended: newStudent.hasAttended  ? false: true})
            dispatch(attendStudent({id:newStudent.id, hasAttended:newStudent.hasAttended}))
        } catch (error) {
            console.log('error handle check', error)
        }
        setLoading(false)

    }

    const scanHandler = ()=>{
        navigate('Scan')
    }
    const handleUpload = ()=>{
        createStudents(students)
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        hideDatePicker();
      };

    useLayoutEffect(()=>{
        setOptions({headerRight: ()=> {
            return <View style={tw`flex-row items-center justify-between w-44`}>
                <TouchableOpacity onPress={()=>navigate('Register')}><Feather name='plus' size={32}/></TouchableOpacity>
                <View style={tw`mr-2 font-semibold`}>
                    <Text style={tw`font-bold text-green-500`}>Present: {students.filter((student)=> student.hasAttended).length}/{students.length}</Text>
                    <Text style={tw`font-bold text-red-500`}>Absent: {students.filter((student)=> !student.hasAttended).length}/{students.length}</Text>
                </View>
            </View>
        }})
    }, [students])
    return (
        <View style={tw`flex-1`}>
            {/* <Text>List Screen</Text> */}
            <View style={tw`flex-row items-center justify-start`}>
                        <View style={tw` ml-16`}></View>
                        <Text style={tw`py-2 font-bold text-xl w-2/5`}>ID</Text>
                        <Text style={tw`py-2 font-bold text-xl`}>Full Name</Text>
                    </View>
            {students ? <FlatList
                data={students}
                keyExtractor={(student)=>student.firebaseId}
                renderItem={({item})=>{
                    return <View style={tw`flex-row items-center justify-start `}>
                        <CheckBox style={tw` mb-2`} checked={item.hasAttended} 
                            onPress={()=>handleCheckPress(item)}></CheckBox>
                        <Text style={tw` w-2/5`}>{item.id}</Text>
                        <Text style={tw``}>{item.name}</Text>
                    </View>
                }}
            ></FlatList>: <Spinner></Spinner>}
            {/* <Button title={'upload'} onPress={handleUpload}></Button> */}
            <View style={tw`flex-row justify-around`}>
                {/* <TouchableOpacity onPress={scanHandler} style={tw`flex-1`}> */}
                    
                    {/* <Text><FontAwesome name='calendar' size={32}></FontAwesome> Date</Text> */}
                {/* </TouchableOpacity> */}
                    
                <View  >
                    <Button title={<Text style={tw`text-lg text-white`}><FontAwesome name='calendar' size={22}></FontAwesome> Date</Text>} onPress={showDatePicker} style={tw`w-full`}/>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                </View>
                    <Button title={<Text style={tw`text-lg text-white`} onPress={()=>navigate('Scan')}>Scan QR Code</Text>}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
})

export default ListScreen;
