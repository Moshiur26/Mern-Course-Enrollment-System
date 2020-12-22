
const create = async (params, credential, ) => {
    try {
        let response = await fetch('/api/enrollment/new/' + params.courseId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credential.t
            }
        })
        return await response.json()
    } catch(err) {
        console.log("api-enrollment create error: ", err);
    }
}
const read = async (params, credential, signal) => {
    try {
        let response = await fetch('/api/enrollment/' + params.enrollmentId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credential.t
            }
        })
        return response.json()
    } catch(err) {
        console.log("api-enrollment read error: ", err);
    }
}
const complete = async (params, credential, data) => {
    try {
        let response = await fetch('/api/enrollment/complete/' + params.enrollmentId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credential.t
            },
            body: data
        })
        return response.json()
    } catch(err) {
        console.log("api-enrollment complete error: ", err);
    }
}

const listEnrolled = async (credential, signal) => {
    try {
        let response = await fetch('/api/enrollment/enrolled', {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credential.t
            }
        })
        return response.json()
    } catch(err) {
        console.log("api-enrollment listEnrolled error: ", err);
    }
}

const enrollmentStats = async (params, credential, signal) => {
    try {
        let response = await fetch('/api/enrollment/stats/' + params.courseId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credential.t
            }
        })
        return response.json()
    } catch (err) {
        console.log("api-enrollment enrollmentStats error: ", err);
    }
}

export {create, read, complete, listEnrolled, enrollmentStats}