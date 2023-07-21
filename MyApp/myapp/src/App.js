import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import HeaderComponent from './components/Header';
import AddEditContact from './components/AddEditContact';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    selectedContact: null, // To hold the selected contact for editing
  };

  handleAddContact = (newContact) => {
    
    // Generate a new unique ID for the new contact
    const newContactWithId = { ...newContact, id: Date.now() };
    
    // Add the new contact to the contacts list
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContactWithId],
    }));
  };

  handleEditContact = (editedContact) => {
    // Find the index of the edited contact in the contacts list
    const contactIndex = this.state.contacts.findIndex((contact) => contact.id === editedContact.id);
    if (contactIndex !== -1) {
      // Create a new contacts array with the edited contact
      const updatedContacts = [...this.state.contacts];
      updatedContacts[contactIndex] = editedContact;

      // Update the contacts list with the edited contact
      this.setState({ contacts: updatedContacts, selectedContact: null });
    }
  };

  handleDeleteContact = (contactId) => {
    // Filter out the deleted contact from the contacts list
    const updatedContacts = this.state.contacts.filter((contact) => contact.id !== contactId);
    
    // Update the contacts list without the deleted contact
    this.setState({ contacts: updatedContacts });
  };

  handleEditButtonClick = (contactId) => {
    // Find the selected contact to be edited
    const selectedContact = this.state.contacts.find((contact) => contact.id === contactId);

    const updatedContacts = [...this.state.contacts];
    updatedContacts[selectedContact.id] = selectedContact;

    // Set the selectedContact in the state to trigger the editing mode in AddEditContact
    this.setState({ contacts: updatedContacts, selectedContact });
  };

  

  handleAddButtonClick = () => {
    // Set selectedContact to null to trigger the adding mode in AddEditContact
    this.setState({ selectedContact: null });
  };

  render() {
      // const { contacts } = this.state;
      const { contacts, selectedContact } = this.state;

    return (
      <div>
        <HeaderComponent />
        <AddEditContact
              isEdit={!!selectedContact}
              contact={selectedContact}
              onSubmit={selectedContact ? this.handleEditContact : this.handleAddContact}
            />
        <ContactList
          contacts={contacts}
          onDeleteContact={this.handleDeleteContact}
          onEditContact={this.handleEditButtonClick}
        />
      </div>
    );
  }
}

export default App;
