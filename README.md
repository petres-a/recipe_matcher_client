# Recipe Matcher

This is the client-side application for the Recipe Matcher project. It is built using React and Redux Toolkit, providing a seamless user experience for searching and exploring recipes. This repository corresponds to the [Recipe Matcher Client](https://github.com/petres-a/recipe_matcher_client/).

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Building for Production](#building-for-production)
5. [Testing](#testing)
6. [Folder Structure](#folder-structure)
7. [Environment Variables](#environment-variables)
8. [Technologies Used](#technologies-used)
9. [List of Improvement Directions](#list-of-improvement-directions)

## Features

- User authentication with login and signup functionality.
- Recipe search and filtering based on user-provided ingredients.
- Pagination support for recipe lists.
- Recipe detail view with comprehensive information.
- Responsive design and user-friendly interface.

## Getting Started

Follow the steps below to get the project up and running locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/petres-a/recipe_matcher_client.git
   cd recipe_matcher_client
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

## Running the Application

Start the development server:

```bash
yarn start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the application for production, run:

```bash
yarn build
```

The production-ready files will be located in the `build` directory.

## Testing

Run tests using the following command:

```bash
yarn test
```

## Folder Structure

- `src/components` - Contains React components, organized by feature.
- `src/store` - Redux store configuration and slices.
- `src/services` - API interaction logic.
- `src/types` - TypeScript type definitions.

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
REACT_APP_API_URL=your_api_base_url
```

Replace `your_api_base_url` with the URL of your backend API.

## Technologies Used

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [TypeScript](https://www.typescriptlang.org/)

## List of Improvement Directions

- Add Cypress tests.
- Improve token logic.
- Add ability to comment on recipes.
- Add ability to add recipes to favorites.
- Enhance accessibility for screen readers.
- Implement dark mode.
- Optimize API request caching.
- Add internationalization (i18n) support for multiple languages.

---

For any issues or questions, feel free to open an issue in the [repository](https://github.com/petres-a/recipe_matcher_client/issues).
