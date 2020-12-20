
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
const update = async (params, credentials, course) => {
    try {
        let response = await fetch('/api/courses/' + params.courseId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: course
        })
        return await response.json()
    } catch (err) {
        console.log("update error: ", err);
    }
}
const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/courses/' + params.courseId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch(err) {
        console.log("Remove Course Error: ", err);
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
        return await response.json()
    } catch(err) {
        console.log("list by user error: ",err);
    }
}
const listPublished = async (signal) => {
    try {
        let response = await fetch('/api/courses/published', {
         method: 'GET',
         signal: signal,
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         }   
        })
    return await response.json()
    } catch (err) {
        console.log("listPublished error: ", err);
    }
}
const read = async (params, signal) => {
    try {
        let response = await fetch('/api/courses/' + params.courseId, {
          method: 'GET',
          signal: signal,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            //   'Authorization': 'Bearer ' +  credentials.t
          }  
        })
        return await response.json()
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
            body: JSON.stringify({lesson: lesson})
        })
        return await response.json()
    } catch(err) {
        console.log("newLesson Error: ", err);
    }
}
export { create, update, listByInstructor, read, newLesson, remove, listPublished }