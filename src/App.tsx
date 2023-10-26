import "./App.css";
import Calendar from "./components/calendar-components/Calendar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Route and Routes

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
});
client;

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/calendar/:year/:month" element={<Calendar />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/" element={<Calendar />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
