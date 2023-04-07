export const GetPosts = async (endpoint, params = {}) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    const requestOptions = {
        method: 'GET',
        headers,
        redirect: 'follow',
    };
    
    params['api-key'] = process.env.REACT_APP_GUARDIAN_API_KEY
    
    return fetch(process.env.REACT_APP_GUARDIAN_URL + '/' + endpoint + '?' + new URLSearchParams(params), requestOptions)
        .then(response => response.json())
        .then(response => response.response)
        .catch(err => {
            console.log('error', err?.message)
        });
};