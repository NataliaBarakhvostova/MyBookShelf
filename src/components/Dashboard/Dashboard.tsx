import React from "react";
import theme from "./Dashboard.module.scss";
import Stages from "../Stages/Stages";

const Dashboard: React.FC = () => {
  return (
    <section className={theme.container}>
      <h1 className={theme.title}>
        <span>My Book Shelf</span>
      </h1>
      <Stages />
      <div className={theme.doodles}>
        <div className={theme.doodlesCat} />
        <div className={theme.doodlesCrown} />
        <div className={theme.doodlesSwish} />
        <div className={theme.doodlesFrog} />
        <div className={theme.doodlesCloud} />
        <div className={theme.doodlesHearts} />
      </div>
    </section>
  );
};

export default Dashboard;
