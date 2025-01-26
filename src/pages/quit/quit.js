import { RootPage } from "../root";
import './quit.css';

class QuitPage extends RootPage {
    pageTitle = "Quit";

    buildPage()
    {
        const quitWrapper = document.createElement("div");
        const message = document.createElement("h2");

        quitWrapper.classList.add("quit-wrapper");
        quitWrapper.appendChild(message);

        message.innerHTML = "Thanks for stopping by!";
        return quitWrapper;
    }

}


export const quitPage = new QuitPage();