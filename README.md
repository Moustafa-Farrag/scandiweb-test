This project was part of Scandiweb Junior Developer test assignment!

## How to start the project ?

1- you can find the backend server [here](https://github.com/scandiweb/junior-react-endpoint).

2- follow the instructions of "How to start" section to run the server side.

3- check server side endpoint working on <http://localhost:4000>.

4- In the project directory, you can run:

### `yarn install`

&nbsp;&nbsp;&nbsp;&nbsp;For installing require packages

### `yarn start`

&nbsp;&nbsp;&nbsp;&nbsp;For running the project then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

&nbsp;&nbsp;&nbsp;&nbsp;Note: maybe you need to install some fonts to have the target view.

## Implemented features?

- &#9745; Ability to add/remove products and change their amounts in cart - on the cart page itself, PLP and PDP should be provided.
- &#9745; For products that have various options (attributes) - the options should be selected.
- &#9745; The selected options of added to cart products should be visible in cart overlay and in cart page.
- &#9745; If an attribute is a swatch attribute (type = swatch), a representation of the value should be rendered on PDP and PLP, rather than text description (e.g. the color itself, not "Blue" or "0000FF")
- &#9745; Filtering products by category name for all of the categories from BE
- &#9745; The descriptions provided in HTML format should be parsed and presented as HTML, not as plain text
- &#9745; Ability to change the currency of the store to one of the available currencies

## Decision I made

As the layout not showing all the options, I made some small decision to overcome this problem ex(using scroll in some positions, making cart overlay more bigger)