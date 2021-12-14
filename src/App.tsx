import "./App.css";
import TrelloBoard from "./components/TrelloBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <TrelloBoard />
      </div>
    </DndProvider>
  );
}

export default App;
