import { createSlice } from "@reduxjs/toolkit";

export interface EventSlice {
    value: {
        id: number | null;
        eventTitle: string;
        startDate: string;
        endDate: string;
        eventImage: string;
        eventCategory: string;
        eventLocation: string;
        description: string;
        ticketName: string
        isPaid: boolean
        availableSeat: number
        ticketPrice: number
        startSaleDate: string
        endSaleDate: string
        cpName: string;
        cpNumber: string;
        eventOrganizerImg: string;
        eventOrganizerName: string;
    } | null
}

const initialState: EventSlice = {
    value: null
}

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEvent: (state, action) => {
            state.value = action.payload 
        }
    }
})

export const { setEvent } = eventSlice.actions