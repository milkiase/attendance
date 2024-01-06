import { createSlice } from "@reduxjs/toolkit";
import { getDateFormat } from "../../utils/attendance.utils";
const initialState = {
    students: [
        // {id: '8904084711055', name: 'miki', hasAttended: false},
        // {id: 'MIT/UR/1097/10', name: 'Milkias', attendance: []},
        // {id: 'MIT/UR/1097/09', name: 'tsegay', attendance: ["2024/01/10"]},
        // {id: 'MIT/UR/175/09', name: 'fissehatsyon', attendance: ["2024/01/06"]},
        // {id: 'MIT/UR/1097/10', name: 'tsegay', attendance: []},
        // {id: '18904084711055', name: 'miki', hasAttended: false},
        // {id: 'M2IT/UR/1097/10', name: 'tsegay', hasAttended: false},
        // {id: '89304084711055', name: 'miki', hasAttended: false},
        // {id: 'MIT4/UR/1097/10', name: 'tsegay', hasAttended: false},
        // {id: '89040847110552', name: 'miki', hasAttended: false},
        // {id: 'MIT/5UR/1097/10', name: 'tsegay', hasAttended: false},
        // {id: '89040684711055', name: 'miki', hasAttended: false},
        // {id: 'MIT/UR7/1097/10', name: 'tsegay', hasAttended: false},
        // {id: '89040848711055', name: 'miki', hasAttended: false},
        // {id: 'MIT/UR/17097/10', name: 'tsegay', hasAttended: false},
        // {id: '89040847171055', name: 'miki', hasAttended: false},
        // {id: 'MIT/UR/10977/10', name: 'tsegay', hasAttended: false},
        // {id: '89040847110755', name: 'miki', hasAttended: false},
        // {id: 'MIT/UR/1097/710', name: 'tsegay', hasAttended: false},
        // {id: '89040847110557', name: 'miki', hasAttended: false},
        // {id: 'MIT7/UR/1097/10', name: 'tsegay', hasAttended: false},
        // {id: '89047084711055', name: 'miki', hasAttended: false},
        // {id: 'MIT/U7R/1097/10', name: 'tsegay', hasAttended: false},
        // {id: '89040874711055', name: 'miki', hasAttended: false},
        // {id: 'MIT/UR/71097/10', name: 'tsegay', hasAttended: false},
    ],
    admin: {
        username: 'admin',
        password: 'admin'
    }    
}

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudents(state, action){
            state.students = action.payload
        },
        addStudent(state, action){
            state.students = [...state.students, action.payload]
        },
        attendStudent(state, action){
            console.log('payload', action.payload)
            if(getDateFormat(new Date())!== action.payload.date) {
                alert('You can not modify previos or next date Attendances!!')
                return
            }
            state.students = state.students.map((student)=>{
                return student.id === action.payload.id ? {...student, attendance: student.attendance.includes(action.payload.date)? (action.payload.canUncheck ? student.attendance.filter((item)=> item != action.payload.date) : student.attendance): [...student.attendance, action.payload.date]} : student
            }) 
        }
    }
})

export const {addStudent, setStudents, attendStudent} = studentsSlice.actions
const studentsReducer = studentsSlice.reducer
export default  studentsReducer