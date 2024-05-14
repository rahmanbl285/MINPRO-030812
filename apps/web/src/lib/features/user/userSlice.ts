import { createSlice } from "@reduxjs/toolkit"

export interface AuthorSlice {
    value: {
        id: number | null,
        email: string,
        password: string,
    } | null;
}

const initialState: AuthorSlice = {
    value: null
}
export const userSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload 
        }
    }
})

export const { setUser } = userSlice.actions