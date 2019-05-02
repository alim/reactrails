import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

/*
 * Contact Form is our component for collecting contact information.
 */
export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
    console.log(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({email: event.target.value});
    console.log( this.state.email );
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    this.setState({email: event.target.value});
    // debugger;
    fetch ('/contacts', {
      method: 'POST',
      body: data,
    });
  }

  render() {
    return (
      <Form className="form" onSubmit={ (e) => this.handleSubmit(e) }>

        <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />

        <FormGroup>
          <Label for="exampleEmail">Email Address:</Label>
          <Input type="email" name="email" id="exampleEmail"
                  placeholder="username@example.com"
                  value={this.state.value} onChange={this.handleChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
