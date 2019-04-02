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
                         <NavLink href="/contacts/new">Contact Us</NavLink>
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

   ExampleNav.propTypes = {};

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
