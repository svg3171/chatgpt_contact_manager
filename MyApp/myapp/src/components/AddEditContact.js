import React, { Component } from 'react';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';

class AddEditContact extends Component {
  state = {
    name: '',
    email: '',
    address: '',
    phone: '',
    isNameValid: true,
    isEmailValid: true,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    const { name, email, address, phone } = this.state;
    if (name && email && address) {
      // Save the contact details
      const contactDetails = { name, email, address, phone };

      this.props.onSubmit(contactDetails);

      // Clear the form fields
      this.setState({ name: '', email: '', address: '', phone: '', isNameValid: true, isEmailValid: true });
    } else {
      // Set validity flags to show red stars
      this.setState({
        isNameValid: !!name,
        isEmailValid: !!email,
      });
    }
  };

  handleReset = () => {
    // Clear the form fields
    this.setState({ name: '', email: '', address: '', phone: '', isNameValid: true, isEmailValid: true });
  };

  handlePhoneChange = (event) => {
    const phone = event.target.value.replace(/\D/g, '').slice(0, 10); // Accept only integers and limit to 10 digits
    this.setState({ phone });
  };

  handleEmailChange = (event) => {
    // Simple email validation using regular expression
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.setState({ email, isEmailValid: emailRegex.test(email) });
  };

  componentDidMount() {
    // Set the cursor to the name field on component mount
    if (this.props.isEdit && this.props.contact) {
      const { name, email, address, phone } = this.props.contact;
      this.setState({ name, email, address, phone });
    }

    if (this.nameInput) {
        this.nameInput.focus();
      }
  };

  componentDidUpdate(prevProps) {
    // If the selected contact prop changes, update the form fields accordingly
    if (this.props.isEdit && this.props.contact !== prevProps.contact) {
      const { name, email, address, phone } = this.props.contact;
      this.setState({ name, email, address, phone });
    }
  }

  render() {
    const { name, email, address, phone, isNameValid, isEmailValid } = this.state;
    const { isEdit } = this.props;

    return (
      <Segment>
        <Form>
          <Form.Input
            label={<label>Name <span style={{ color: 'red' }}>{isNameValid ? '' : '*'}</span></label>}
            name="name"
            value={name}
            placeholder="Contact Name"
            onChange={this.handleInputChange}
            ref={(input) => (this.nameInput = input)}
            error={!isNameValid}
            required
          />
          <Form.Input
            label={<label>Email <span style={{ color: 'red' }}>{isEmailValid ? '' : '*'}</span></label>}
            name="email"
            value={email}
            placeholder="Contact Email"
            onChange={this.handleEmailChange}
            error={!isEmailValid}
            required
          />
          <Form.Input
            label="Address"
            name="address"
            value={address}
            placeholder="Contact Address (Lane, Area, City, District, Zip)"
            onChange={this.handleInputChange}
            required
          />
          <Form.Input
            label="Phone Number"
            name="phone"
            value={phone}
            placeholder="Contact Phone"
            onChange={this.handlePhoneChange}
          />
          <Button primary type="submit" onClick={this.handleSave}>
            {isEdit ? 'Save' : 'Add'}
          </Button>
          <Button onClick={this.handleReset}>Reset</Button>
        </Form>
      </Segment>
    );
  }
}

export default AddEditContact;
