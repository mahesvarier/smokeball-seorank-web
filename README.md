## Getting Started

### Clone the Repository
Run this command in the terminal:
```sh
git clone https://github.com/mahesvarier/smokeball-seorank-web.git
```

## Available Scripts

In the project directory, you can run:

### `npm run build`
Builds the app for production to the `build` folder.

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the tests.

### Run [Smokeball-SEORank-Api](https://github.com/mahesvarier/Smokeball-SEORank-Api) along side this project.

## Operations

### Search for SEO Keywords

The application allows users to search for SEO keywords using the `SearchForm` component. 
The form requires the user to input keywords and a URL. 
Upon submission, the form will display the search results or any errors encountered during the search process.

#### Usage

1. **Enter Keywords**: Type the keywords you want to search for in the "Enter keywords" input field.
2. **Enter URL**: Type the URL you want to search against in the "Enter URL" input field.
3. **Submit**: Click the "Search" button to submit the form.

### Error Handling
If the request returns a response of 429 (Too many attempts), the function will retry the request based on the configured retry policy - exponential backoff.