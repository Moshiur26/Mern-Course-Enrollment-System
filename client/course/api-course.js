import { Sync } from "@material-ui/icons";

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
        console.log("course create response: ",await response);
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
        // console.log("listByUser response: ", response);
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
export { create, listByInstructor, read }