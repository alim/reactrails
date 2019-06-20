import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

/*
 * Contact Form is our component for collecting contact information.
 */
export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
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
    const rails_data = {};

    rails_data['utf8'] = '✓';
    rails_data['authenticity_token'] = data.get('authenticity_token');
    rails_data['contact'] = {};

    // Build data set to send from the values entered on the form.
    // The iterator returns to values. The first is the key of the input
    // element and the second is the value entered in the input element
    for (var pair of data.entries()) {
      if (pair[0] != 'authenticity_token') {
        rails_data['contact'][pair[0]] = pair[1];
      }
    }

    this.setState({email: event.target.value});

    axios.post('/contacts',
      rails_data
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

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
