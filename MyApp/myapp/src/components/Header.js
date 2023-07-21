import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

const HeaderComponent = () => {
  return (
    <Segment textAlign="center">
      <Header as="h2" icon>
        <Icon name="address book" style={{ fontSize: '2.5rem' }} />
        Contact Manager
      </Header>
    </Segment>
  );
};

export default HeaderComponent;