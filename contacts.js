const fs = require("fs/promises");
const path = require("path");
const crypto = require('crypto');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if(!result) {
        return null;
    }
    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const removeContact = contacts.splice(index, 1);
    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
    return removeContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}