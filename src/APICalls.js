import APILink from "./apiConfig"
export const loginUser = async(req) => {
    try{
        const loginRequest = await fetch(`${APILink }api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
        })
        const loginResponse = await loginRequest.json()
        if (loginRequest.status === 200) {
            return loginResponse
        } else{
            return loginResponse.non_field_errors
        }
    }catch(err){
        return 'Failed to communite with server'
    }
}