import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';

const ContactCard = ({ contact, onDelete, onEdit }) => {

  const { name, email, address, phone } = contact;

  return (
    <Segment>
      <Grid columns={2} relaxed="very">
        <Grid.Column>
          <div style={{ marginBottom: '1rem' }}>
            <Icon name="user" /> {name}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Icon name="envelope" /> {email}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Icon name="home" /> {address}
          </div>
          <div>
            <Icon name="phone" /> {phone}
          </div>
        </Grid.Column>
        <Grid.Column>
          <div style={{ textAlign: 'center' }}>
            <Icon name="edit" size="large" link onClick={onEdit} />
            <Icon name="trash alternate" size="large" link onClick={onDelete} />
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ContactCard;
