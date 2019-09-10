const {contact }= require('../models/index');

const addContact = async (contactData) => {
    let result = await contact.create(contactData);
    return result;
}

const getContacts = async () => {
    let result = await contact.findAll({ raw: true
    });

    return result;
}

const getContactsByUserId = async (userId) => {
    let result = await contact.findAll({
        where: {
            user_id: userId
        }
    });
    return result;
}


const updateContact = async (contactId, contactData) => {
    let result = await contact.update(
        contactData,
        {
            where: {
                id: contactId
            }
        });
    return result;
}
const removeContact = async (contactId) => {
    let result = await contact.destroy(
        {
            where: {
                id: contactId
            }
        });
    return result;
}

module.exports = {
    removeContact,
    addContact,
    updateContact,
    getContacts,
    getContactsByUserId
}
