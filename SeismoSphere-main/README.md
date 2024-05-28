
# SeismoSphere

SeismoSphere is a web application that provides real-time information on earthquakes in Indonesia. It features an interactive map and a detailed table to display earthquake data, allowing users to visualize and analyze earthquake occurrences.

## Features

- **Interactive Map**: Displays earthquake pinpoints on a map with detailed information in pop-ups.
- **Earthquake Table**: Lists all recent earthquakes with details such as date, time, magnitude, depth, and location.
- **Seamless Navigation**: Clicking on a table row centers the map on the selected earthquake and opens its popup.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **React Bootstrap**: For responsive and modern UI components.
- **Leaflet**: For interactive maps.
- **Axios**: For making HTTP requests to fetch earthquake data.
- **Context API and Reducer**: For state management.

## Getting Started

Follow these instructions to set up and run SeismoSphere on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.
- Internet connection to fetch real-time data.

### Installation

1. **Clone the repository:**
  ```bash
   git clone https://github.com/Malikusfz/SeismoSphere.git
   cd SeismoSphere
  ```

2. **Install dependencies:**
  ```bash
   npm install
  ```

3. **Run the development server:**
  ```bash
   npm run dev
  ```

4. Open your browser and navigate to \`http://localhost:5173\`.

## Project Structure

```
SeismoSphere/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── EarthquakeMap.jsx
│   │   ├── EarthquakeTable.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── MapPage.jsx
│   │   ├── TablePage.jsx
│   │   └── ...
│   ├── state/
│   │   ├── EarthquakeContext.jsx
│   │   ├── earthquake/
│   │   │   ├── earthquakeActions.js
│   │   │   ├── earthquakeReducer.js
│   │   │   └── ...
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── ...
├── .eslintrc.cjs
├── package.json
├── vite.config.js
└── README.md
```

## Key Files and Directories

- **components/**: Contains React components for the map and table.
- **pages/**: Contains page components that use the main components.
- **state/**: Contains context and reducer for state management.
- **App.jsx**: Main application component that sets up routing.
- **index.css**: Custom styles for the application.
- **main.jsx**: Entry point of the React application.

## Usage

- **View Earthquake List**: Navigate to the home page to see a table listing recent earthquakes.
- **Interactive Map**: Navigate to the map page to see pinpoints of earthquakes. Click on a pinpoint to see details.
- **Seamless Navigation**: Click on any row in the table to automatically center the map on the selected earthquake and open its popup.

## Customization

To customize the application, you can modify the components in the \`src/components/\` directory and the state management in \`src/state/\`.

## Contributing

If you would like to contribute to SeismoSphere, please follow these steps:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature/YourFeature\`).
3. Make your changes.
4. Commit your changes (\`git commit -m 'Add some feature'\`).
5. Push to the branch (\`git push origin feature/YourFeature\`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [BMKG](https://www.bmkg.go.id/) for providing earthquake data.
- [React](https://reactjs.org/) for the framework.
- [Leaflet](https://leafletjs.com/) for the interactive map.
- [Bootstrap](https://getbootstrap.com/) for the responsive UI components.

---

Thank you for using SeismoSphere! If you have any questions or feedback, feel free to reach out.
