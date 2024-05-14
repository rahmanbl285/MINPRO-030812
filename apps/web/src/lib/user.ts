export const regUser = async (data: any) => {        
    const res = await fetch(`http://localhost:8000/api/users/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await res.json()
    return result
}

export const loginUser = async (data: any) => {    
    const res = await fetch(`http://localhost:8000/api/users/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await res.json()
    return result
}

export const getUser = async (token: any) => { 
    if (token) {
        const res = await fetch(`http://localhost:8000/api/authors/keep-login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        const result = await res.json()
        console.log(result);
        
        return result
    } else {
        return "Login First"
    }
}
