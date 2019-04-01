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

# Setup

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
1. Double check the installation, which should not yield any errors:
```
yarn check
```
