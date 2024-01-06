import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    students: [
        // {id: '8904084711055', name: 'miki', hasAttended: false},
        {id: 'MIT/UR/1097/10', name: 'tsegay', attendance: []},
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
            state.students = state.students.map((student)=>{
                return student.id === action.payload.id ? {...student, hasAttended: action.payload.hasAttended === undefined ? true: !student.hasAttended} : student
            }) 
        }
    }
})

export const {addStudent, setStudents, attendStudent} = studentsSlice.actions
const studentsReducer = studentsSlice.reducer
export default  studentsReducer