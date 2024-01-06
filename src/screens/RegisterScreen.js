import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import { Button, Input } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { createStudent } from '../utils/Firebase.utils';
import { addStudent } from '../store/students/studentsSlice';
import { useDispatch } from 'react-redux';

const RegisterScreen = () => {
    const {navigate} = useNavigation()
    const dispatch = useDispatch()
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const handleAddStudent = async()=>{
        try {
            const firebaseId = await createStudent({id, name})
            // const newStudent = {id, name, hasAttended: false, firebaseId}
            const newStudent = {id: id.toUpperCase(), name, attendance: [], firebaseId}
            dispatch(addStudent(newStudent))
            navigate('List')
        } catch (error) {
            console.log('error registering student')
        }
    }
    return (
        <View style={tw` pt-8`}>
            <Input
                label='ID' autoCapitalize='characters' placeholder="Student's ID" autoFocus
                value={id} onChangeText={setId}/>
            <Input
                label='Full Name' textContentType='name' placeholder="Student's fullname"
                value={name} onChangeText={setName}/>
            <Button title={'Save'} onPress={handleAddStudent} disabled={!(id || name)}/>
        </View>
    );
}

const styles = StyleSheet.create({})

export default RegisterScreen;
