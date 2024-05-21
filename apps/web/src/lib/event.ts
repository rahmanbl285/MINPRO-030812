export const createEvent = async (data: any) => {
    const res = await fetch(`http://localhost:8000/api/events/create-event`, {
        method: "POST",
        body: data
    })

    
    const result = await res.json()
    
    return result
}

export const getEvent = async () => {
    const res = await fetch (`http://localhost:8000/api/events/`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },    
        next: { revalidate: 10 }})

    const result = await res.json()

    return result
}

export const getEventSlug = async (eventSlug: string) => {
    const res = await fetch (`http://localhost:8000/api/events/${eventSlug}`, { next: {  revalidate: 3600 } })
    const data = await res.json()

    return data
}