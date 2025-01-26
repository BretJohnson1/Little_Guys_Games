import { ApplicationPage, QuitPage, SocialsPage, StartPage, Navigator } from './pages/index';
import '/node_modules/normalize.css/normalize.css';

// creates menu items and makes the pages available
Navigator.attachPages(
    StartPage,
    SocialsPage,
    ApplicationPage,
    QuitPage
);