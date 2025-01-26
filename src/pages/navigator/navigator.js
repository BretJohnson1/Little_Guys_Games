import { RootPage } from '../root';
import './navigator.css';

/**
 * The PageNavigator controls page navigation and renders the main navigation menu.
 */
class PageNavigator {
    #pages = [];
    #logo;
    #audio;

    constructor() {
        // setup logo element
        this.#logo = document.createElement("img");
        this.#logo.src = "media/images/rat_logo_text.svg";
        this.#logo.classList = "menu-image";
        this.#logo.alt = "LGG Logo";

        // setup audio element
        this.#audio = document.createElement("audio");
        this.#audio.src = "/media/sound/noise.mp3";
    }

    /**
     * Add a new page / section to the website.
     */
    attachPage(page, ordinal = 0) {
        // Setup navigation
        this.#createMenuItemFromPage(page, ordinal);
        this.#renderNavigator();
    }

    /**
     * Add several pages at once using the order they were passed in as.
     */
    attachPages(...pages) {
        pages.forEach((p, i) => this.#createMenuItemFromPage(p, i));
        this.#renderNavigator();
    }

    /**
     * Called when navigating to the main menu.
     */
    #renderNavigator() {
        // create elements
        const menu = this.#generateMenu();
        const menuPage = document.createElement("section");
        menuPage.classList.add("menu-container");

        // create structure and render page
        menuPage.appendChild(this.#logo);
        menuPage.appendChild(menu);
        this.#setPageContent(menuPage);

        // fade in the menu
        menuPage.animate([
            { opacity: 1 }
        ], { duration: 350, direction: 'normal', fill: 'forwards' })

    }

    /**
     * Generates the DOM structure for the menu buttons and returns them so
     * they are ready to be attached to a DOM node.
     */
    #generateMenu() {
        // create container element that holds all the buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("menu-buttons");

        // generate the buttons
        for (const page of this.#pages) {
            const btn = document.createElement("button");
            btn.classList.add("menu-button");

            // play sound on hover
            btn.addEventListener('mouseover', _ => {
                this.#audio.currentTime = 0;
                this.#audio.play();
            });

            btn.addEventListener('click', _ => {
                this.#navigateToPage(page.page);
            });

            // set button text and add to container
            btn.innerHTML = `${page.buttonText}`;
            buttonContainer.appendChild(btn);
        }

        return buttonContainer;
    }

    /**
     *  This method creates the navigational buttons based on pages passed into the PageNavigator
     */
    #createMenuItemFromPage(page, ordinal) {
        // Ensure pages correctly extends RootPage.
        if (!page instanceof RootPage) console.error("The object passed into Navigator.attachPage must extend RootPage.");

        // create the new navigation element.
        this.#pages.push({
            buttonText: page.pageTitle,
            page,
            ordinal
        });

        // Sort the menu by ordinal, then alphabetically.
        this.#pages = this.#pages.toSorted((a, b) => {
            const ordinalDifference = a.ordinal - b.ordinal;
            return ordinalDifference == 0
                ? a.buttonText.localeCompare(b.buttonText)
                : ordinalDifference;
        });
    }

    /**
     *  Constructs the basic wrapper elements for a page and attaches the page
     *  to the wrapper before rendering the newly built page.
     */
    #navigateToPage(page) {
        const pageWrapper = document.createElement("section");
        pageWrapper.classList.add("page-wrapper");
        pageWrapper.appendChild(this.#createMainMenuButton(page));
        pageWrapper.appendChild(page.buildPage());
        this.#setPageContent(pageWrapper);
        pageWrapper.animate([
            { opacity: 1 }
        ], { duration: 350, direction: 'normal', fill: 'forwards' })
    }

    /**
     * Returns a button which when clicked will replace the app contents
     * with the navigation menu allowing the user to go to a different page
     */
    #createMainMenuButton() {
        const btn = document.createElement("button");
        btn.classList.add("menu-button");
        btn.classList.add("main");
        btn.innerHTML = "Main Menu";
        btn.addEventListener('click', () => {
            // just render the menu again.
            this.#renderNavigator();
        });
        return btn;
    }

    /**
     * This method updates the page when a user clicks on any of the navigation buttons. 
     */
    #setPageContent(content) {
        if (!content)
            throw new Error("Navigator #setPageContent was called with undefined HTML node");

        const root = document.querySelector('#app');
        if (!root)
            throw new Error("The ROOT node of the application could not be found. Did you accidentally delete the <div> with the id 'app'?");

        // reset HTML content of the app and set it to the newly generated content
        root.innerHTML = "";
        root.appendChild(content);
    }
}



export const Navigator = new PageNavigator()