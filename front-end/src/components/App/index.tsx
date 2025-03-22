import { Home } from "../../pages";
import { Header } from "../Layout";
import styles from "./styles.module.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Home />
    </div>
  );
}

export default App;
