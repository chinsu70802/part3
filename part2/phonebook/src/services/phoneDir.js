import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addNew = (newEntry) => {
    return axios.post(baseUrl, newEntry)
}

const deleteDir = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateDir = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person)
}

export default {
    getAll,
    addNew,
    deleteDir,
    updateDir
}