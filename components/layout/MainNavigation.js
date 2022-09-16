import Link from "next/link";
import { NAVIGATION } from "../../config/navigation.config";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link href="/">React Places</Link>
      <nav>
        <ul>
          {NAVIGATION.map(({ title, path }, index) => (
            <li key={title + index}>
              <Link href={path}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
