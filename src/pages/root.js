/**
 * This file describes basic functionality for all pages.
 */
export class RootPage {
    pageTitle = "ROOT";

    buildPage()
    {
        const page = document.createElement("section");
        page.innerHTML = "<h2>buildPage method not overwritten</h2>";
        return page;
    }

}

