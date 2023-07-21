import React, { Component } from 'react';
import { Segment, Header, Divider, Message } from 'semantic-ui-react';
import ContactCard from './ContactCard';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 3,
    };
  }

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { contacts, onDeleteContact, onEditContact } = this.props;
    const { currentPage, pageSize } = this.state;

    // Calculate the start and end indices of the contacts to be displayed on the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const totalPages = Math.ceil(contacts.length / pageSize);

    // Get the contacts to display on the current page
    const currentContacts = contacts.slice(startIndex, endIndex);

    return (
      <Segment>
        <Header as="h2">Contact List</Header>
        {contacts.length === 0 ? (
          <Message>No Contacts Available</Message>
        ) : (
          <>
            {currentContacts.map((contact, index) => (
              <div key={contact.id}>
                <ContactCard
                  contact={contact}
                  onDelete={() => onDeleteContact(contact.id)}
                  onEdit={() => onEditContact(contact.id)}
                />
                {index !== currentContacts.length - 1 && <Divider />}
              </div>
            ))}
            {totalPages > 1 && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      cursor: 'pointer',
                      margin: '0.3rem',
                      fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                    }}
                    onClick={() => this.handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </Segment>
    );
  }
}

export default ContactList;
