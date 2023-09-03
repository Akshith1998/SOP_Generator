import React from "react";
import { Header } from "./components/Header/Header.tsx";
import { DescriptionSection } from "./components/DescriptionSection/DescriptionSection.tsx";
import { StepsComponent } from "./components/StepsComponent/StepsComponent.tsx";
import { DetailsSection } from "./components/DetailsSection/index.js";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <DescriptionSection />
      <StepsComponent />
      <DetailsSection />
    </div>
  );
}

export default App;
