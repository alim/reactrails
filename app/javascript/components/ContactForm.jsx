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
    this.setState({email: event.target.value});
    console.log( this.state.email )
  }

  render() {
    return (
      <Form className="form" onSubmit={ (e) => this.handleSubmit(e) }>
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
