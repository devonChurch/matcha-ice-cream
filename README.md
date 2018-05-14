# Matcha Ice Cream

A proof of concept around creating an automated language translation sequence at the _"build"_ phase level.

Translation is executed via [AWS Translate](https://aws.amazon.com/translate/) as part of a [Webpack](https://webpack.js.org/) build sequence and absorbed as content in [React](https://reactjs.org/).

## Demo

[Click here](https://devonchurch.github.io/matcha-ice-cream/)

![translate-examples](https://user-images.githubusercontent.com/15273233/39965452-eaae2ee2-56ec-11e8-8ba4-e9ecfe1a86c1.png)

## Installation

* Clone this repository

  ```
  git clone https://github.com/devonChurch/matcha-ice-cream.git
  ```

* Install project dependancies

  ```
  npm install
  ```

* Build and open a local _development_ version of the application

  ```
  npm start
  ```

## Development

* Add your _"static"_ string references to the content object with a base language of **English**.

  ```javascript
  // ...
  const translator = createTranslator('en');
  const transcript = {
    message: await translator('Hello World!')
  };
  // ...
  ```

* Create a _development_ build with your translation content

  ```
  npm run build:development
  ```

  The translator function will create each language string variant and a corresponding `.html` scaffold as part of the applications URL structure.

- Rehydrate your _React_ application on the _client_ from the translation object embedded into the `DOM`

## Deployment

* Build and deploy a _production_ version of the application to your repositories `gh-pages` branch

```
npm run deploy
```

## License

MIT
