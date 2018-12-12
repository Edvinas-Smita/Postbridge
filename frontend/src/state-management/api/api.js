export function getAuthHeader (state, headers) {
    return ({
        ...headers,
        Authorization: `Bearer ${state.auth.accessToken}`,
    })
}

export function status(response) {
    if (response.ok || response.status < 400) {
        return response.json();
    }
    else {
        throw Error(response.error);
    }
}