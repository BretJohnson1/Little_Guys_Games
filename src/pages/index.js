/**
 * Re-exports all the application pages to make it easier 
 * to import them in other files
 */


import { socialsPage } from "./socials/socials";
import { applicationPage } from "./apply/apply";
import { quitPage } from "./quit/quit";
import { startPage } from "./start/start";

export const StartPage = startPage;
export const SocialsPage = socialsPage;
export const ApplicationPage = applicationPage;
export const QuitPage = quitPage;
export * from './navigator/navigator';