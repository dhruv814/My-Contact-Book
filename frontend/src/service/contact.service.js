import axios from "axios";

export default class contactService {
    async getContacts() {
        return await axios.get('http://192.1.200.26:8000/contacts').then(res => res.data);
    }

    async getContactByUserId(id) {
        return await axios.get(`http://192.1.200.26:8000/contacts/${id}`).then(res => res.data);
    }

    async deleteById(id){
        return await axios.delete('http://192.1.200.26:8000/contacts/'+id).then(res => res.data);
    }

    async updateById(id,contact){
        await axios.put('http://192.1.200.26:8000/contacts/'+id,contact).then(res => res.data);
        return true;
    }
    async addContact(contact){
        let result=await axios.post('http://192.1.200.26:8000/contacts',contact);
        return true;
    }
}