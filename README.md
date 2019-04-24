# Reactrails Sample

This repository is an instructional example for creating a Rails application
using Webpacker, React.js, react-rails, and Reacstrap. It's based on
Rails 5.2.2 running on Ruby 2.5.1. The master branch of the this repository
represents the end state of all the tutorial steps documented in this
README file.

The application model behind this example has the following goals in mind:
1. Enable us to use a modern Javascript frame work like React with Rails.
1. Simplify the organization of assets to only use webpack/wepacker without the need for the asset pipeline
1. Support simple ERB templates with React components handling all the view layer presentation and interactions

# Installation

To setup this application we did the following which includes installation and
updating of the javascript packages:

1. Generate a new rails applicaiton, but with out the asset pipeline: `
   ```
   rails new reactrails --webpack=react --skip-coffee --skip-javascript --skip-sprockets
   ```
1. Change to the application directory:
   ```
   cd reactrails
   ```
1. Edit the Gemfile to include :
   ```
   gem 'react-rails'
   ```
1. Install the gem:
   ```
   bundle install
   ```
1. Add reactstrap via yarn:
   ```
   yarn add reactstrap
   ```
1. Add bootstrap via yarn:
   ```
   yarn add bootstrap@^4.3
   ```
1. Update javascript core modules:
   ```
   yarn add core-js@3
   ```
1. Double check the installation, which should not yield any errors:
   ```
   yarn check
   ```
1. Finish the react installation:
   ```
   rails generate react:install
   ```

After installation, you can run the `webpack-dev-server` in a separate terminal
window. This server will automatically compile and javascript or JSX code in
the `app/javascript` directory.

# Initial Controller and View Setup

1. Create the home controller.
   ```
   rails g controller Home index
   ```

1. Add the root route to the config/routes.rb file.
   ```
   root to: 'home#index'
   ```

1. Update the view template app/views/layouts/application.html.erb by adding:
   ```
   <%= javascript_pack_tag 'application' %>
   ```
   This line adds in the webpack entry point for the javascript components
   that will be used by our application. From the same file, remove the
   asset pipeline helper, since we are not using the asset pipeline:
   ```
   <%= stylesheet_link_tag 'application', media: 'all' %>
   ```

1. Update config/initializers/content_security_policy.rb to allow content from
   webpack-dev-server.
   ```
   policy.connect_src :self, :https, 'http://localhost:3035', 'ws://localhost:3035' if Rails.env.development?
   ```

1. Remove the auto-generated hello-world component created by the webpacker
   react installation, by deleting the file `app/javascript/packs/hello_react.jsx`

# Adding Bootstrap Components

In this section we modify our sample application to use a couple of React.js
components that are part of the Reactstrap package. The steps for this
modification are:

1. Update the app/javascript/packs/application.js file to include the lines
   below to add in the standard bootstrap stylesheet.
   ```
   import 'bootstrap/dist/css/bootstrap.min.css'
   ```

1. Generate a component for holding the example navigation bar:
   ```
   rails g react:component ExampleNav
   ```

1. This will generate a scaffold component in `app/javascript/components/ExampleNav.js`
   Rename the file to `ExampleNav.jsx`, just because we are going to drop some
   JSX code in there from Reactstrap to create a navigation bar. The code we will
   add to that file is as follows:
   ```
   import React from "react"
   import PropTypes from "prop-types"

   import {
     Collapse,
     Navbar,
     NavbarToggler,
     NavbarBrand,
     Nav,
     NavItem,
     NavLink,
     UncontrolledDropdown,
     DropdownToggle,
     DropdownMenu,
     DropdownItem } from 'reactstrap';

   class ExampleNav extends React.Component {
     constructor(props) {
       super(props);

       this.toggle = this.toggle.bind(this);
       this.state = {
         isOpen: false
       };
     }

     toggle() {
       this.setState({
         isOpen: !this.state.isOpen
       });
     }

     render () {
       return (
         <React.Fragment>
             <Navbar color="light" light expand="md">
               <NavbarBrand href="/">reactstrap</NavbarBrand>
               <NavbarToggler onClick={this.toggle} />
               <Collapse isOpen={this.state.isOpen} navbar>
                 <Nav className="ml-auto" navbar>
                   <NavItem>
                     <NavLink href="/components/">Components</NavLink>
                   </NavItem>
                   <NavItem>
                     <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                   </NavItem>
                   <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret>
                       Options
                     </DropdownToggle>
                     <DropdownMenu right>
                       <DropdownItem>
                         Option 1
                       </DropdownItem>
                       <DropdownItem>
                         Option 2
                       </DropdownItem>
                       <DropdownItem divider />
                       <DropdownItem>
                         Reset
                       </DropdownItem>
                     </DropdownMenu>
                   </UncontrolledDropdown>
                 </Nav>
               </Collapse>
             </Navbar>
         </React.Fragment>
       );
     }
   }

   export default ExampleNav
   ```

1. Now we update the `app/views/layout/application.html.erb` to include the
   react component:
   ```
   <body>
     <%= react_component("ExampleNav") %>
     <%= yield %>
   </body>
   ```

This now give us a basic navigation bar that will be used for the application
layout and it's related view files.

# Adding a Component to a View template

The previous section added the navigation bar to the layout template which will
add the navigation bar to all our views. We can obviously use different
layout files, but that is a topic for another section.

1. We are going to use the Jumbotron component and add it to the index template.
   We need to create a `ExampleJumbotron.jsx` in `/app/javascript/components`.
   The code for using the Jumbotron component is below and should go in the
   `ExampleJumbotron.jsx` file.
   ```
   import React from 'react';
   import { Jumbotron, Button} from 'reactstrap';

   const ExampleJumbotron = (props) => {
     return (
       <div>
         <Jumbotron>
           <h1 className="display-3">Hello, world!</h1>
           <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
           <hr className="my-2" />
           <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
           <p className="lead">
             <Button color="primary">Learn More</Button>
           </p>
         </Jumbotron>
       </div>
     );
   };

   export default ExampleJumbotron;
   ```

1. Add the component to the `/app/views/home/index.html.erb` using the
   following:
   ```
   <%= react_component("ExampleJumbotron") %>
   <h1>Home#index</h1>
   <p>Find me in app/views/home/index.html.erb</p>
   ```

Your `/app/javascript` directory should have the following structure, after
executing the commands from the previous sections:
```
javascript
├── components
│   ├── ExampleJumbotron.jsx
│   └── ExampleNav.jsx
└── packs
    ├── application.js
    └── server_rendering.js
```

# Adding a Resource, View and Form

For a standard Rails application, we will typically define one or more web-based
resources that are presented by a database model, a controller for interacting
with the views and the database model, and a view layer for interacting with
the end user. For our example, we are going to generate a _Contact_ resource
that will use React components in the view layer.

1. Generate a scaffold for a contact resource:
   ```
   rails g scaffold Contact name:string email:string subject:string message:text
   ```

1. Remove unneeded items, since we are not using the asset pipeline, but
   webpacker instead.
   ```
   rm app/assets/javascripts/contacts.js
   rm app/assets/stylesheets/contacts.css
   rm app/assets/stylesheets/scaffold.css
   ```

1. Run `rake db:setup` if you have not setup the database yet or
   `rake db:migrate`, if you have already setup the database.

1. Setup the *Options* menu to include the new contact page. In the
   `ExampleNav.jsx` file replace the _Option 1_ value with the
   NavLink element shown below. This will now navigate you to the new contacts
   form:
   ```
   <NavLink href="/contacts/new">Contact Us</NavLink>
   ```

1. Create a contact form component that will be used for the new and edit views. This component will be located in *app/javascript/components/ContactForm.jsx*.
   ```
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
   ```

1. Update the *app/views/new.html.erb* file to include the new component.
   ```
   <h1>New Contact</h1>

   <%= react_component("ContactForm", action: contacts_path, method: 'POST',
                       'accept-charset': "UTF-8") %>

   <%= link_to 'Back', contacts_path %>
   ```
