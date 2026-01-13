import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

let url = 'http://localhost:3000/api/users';


export const saveUserDetail = async (data) =>{  

    const formData ={
        full_name : data.full_name,
        email: data.email,
        location: data.location,
        phone: data.phone,
        pro_title: data.title  
    }
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        },
    })

    if(!response.ok){
        const error = new Error('An error occured to save user detail');
        error.status = response.status;
        error.info = await response.json();
        throw error;
    }

    const  user  = await response.json();

    return user;
}


export const fetchLatestUser = async () => {
    const response = await fetch(`${url}/latest`);
    if(!response.ok){
        const error = new Error('An error occurred during fetching user');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    };

    const data = await response.json()
    return data;

}


export const fetchUserDetail = async ({queryKey, signal})=>{
   
    const [ , userId] = queryKey;
    const response = await fetch(`${url}/${userId}`, {signal} );
    if(!response.ok){
        const error = new Error('An error occurred during fetching user');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const data  = await response.json();

    return data;
}

export const SaveUserProfessionalData = ({queryKey, signal})=>{
    const [, userId] = queryKey;
    const response = fetch(`${url}/${userId}`)
}