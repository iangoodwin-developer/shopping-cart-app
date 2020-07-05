This app can be previewed at http://ianjamesgoodwin.com/

A few notes about my solution:

My focus for the solution was to create a shopping cart application which allows the user to

- Create / delete shopping carts
- View shopping carts
- Add items to carts from either the cart view or the list of carts view
- Increase the quantity of a single item incrementally or by using a numeric input
- Let the price increase by the increasing quantity of that item
- Delete items

I also wanted to have the application state be persisted in the browser storage, in order to mimic a shopping cart for a real shop. The use of browser storage is useful for scenarios where a user is shopping but is not logged in with a user. In the case of this application, the state is managed using a redux / flux pattern. This pattern uses the concept of actions to change application shared data, helping to have state management in one place. Actions can be associated with effects (like side-effects) which can be services such as browser storage, session storage or database storage.

Where I DID NOT place particular focus in this solution was the design of the layout. I did not attempt to make a realistic shop. So this project is not a particularly good example of styling or branding. 

# Angular shopping cart app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
