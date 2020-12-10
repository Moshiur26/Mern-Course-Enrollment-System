
const create = async (params, credentials, course) => {
    try {
        let response = await fetch('/api/courses/by/' + params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: course
        })
        return await response.json()
    } catch(err) {
        console.log("Error: ", err);
    }
}
const listByInstructor = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/courses/by/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    } catch(err) {
        console.log("list by user error: ",err);
    }
}
const read = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/courses/' + params.courseId, {
          method: 'GET',
          signal: signal,
          headers: {
              'Accept': 'application/json',
            //   'Content-Type': 'application/json'
              'Authorization': 'Bearer ' +  credentials.t
          }  
        })
        console.log("read response: ",response);
        return response.json()
    } catch(err) {
        console.log("read error: ",err);
    }
}
const newLesson = async (params, credentials, lesson) => {
    try {
        let response = await fetch('/api/courses/' + params.courseId + '/lesson/new', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: lesson
        })
        return response.json()
    } catch(err) {
        console.log("newLesson Error: ", err);
    }
}
export { create, listByInstructor, read, newLesson }