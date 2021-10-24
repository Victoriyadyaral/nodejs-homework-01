const fs = require("fs/promises");
const path = require("path");
const crypto = require('crypto');

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    if (!contacts) {
        console.log("You don`t have any contact");
        return [];
    }
    console.log('Your contacts: ');
    console.table(contacts);
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if (!result) {
        console.log(`Contact with ID "${contactId}" not found!`);
        return null;
    };
    console.log(`Get contact by ID ${contactId}:`);
    console.table(result);
    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        console.log("This contact isn't in contacts")
        return null;
    }
    const removeContact = contacts.splice(index, 1);
    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
    console.log(`${removeContact.name} removed from contacts`);
    console.table(contacts);
    console.table(removeContact);
    return removeContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
    console.log('Contacts added successfully! New lists of contacts: ');
    console.table(contacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}