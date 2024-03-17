import {createSlice} from "@reduxjs/toolkit";
import {IName} from "../../types/Types.ts";

const initialState: IName = {
    name: "",
    nameArray: [],
}

const NameSlice = createSlice({
    name: "nameSlice",
    initialState,
    reducers: {
        setName: (state, {payload}) => {
            state.name = payload
        },
        setNameArray: (state, {payload}) => {
            state.nameArray.push(payload)
        }
    }
})

export default NameSlice.reducer
export const {setName, setNameArray} = NameSlice.actions