import { RootPage } from "../root";
import './socials.css';

class SocialsPage extends RootPage {
    pageTitle = "Options";
    #links = [
        {
            url: 'https://www.youtube.com/@LittleGuysGames',
            logo: 'yt',
            text: 'YouTube'
        },
        {
            url: 'https://www.instagram.com/little_guys_games?igsh=MWI5Ymw2MHNlbGFj',
            logo: 'ig',
            text: 'Instagram'
        },
        {
            url: 'https://discord.gg/yQmZ8gGG',
            logo: 'dcord',
            text: 'Discord'
        },
        {
            url: 'https://www.kickstarter.com/projects/shoptillyoudrop/shop-till-you-drop',
            logo: 'ks',
            text: 'Kickstarter'
        }
    ];

    buildPage() {
        // create elements
        const socialsPage = document.createElement("div");
        const callout = document.createElement("h2");
        const inner = document.createElement("div");

        // socialsPage
        socialsPage.appendChild(inner);
        socialsPage.classList.add("socials-wrapper");

        // inner
        inner.classList.add("inner");
        inner.appendChild(callout);
        this.#links
            .map(this.#linkToDOM)
            .forEach(domLink => inner.appendChild(domLink));

        // callout
        callout.innerHTML = "Little Guys Games is not a big studio, we need your help and support!";
        return socialsPage;
    }

    #linkToDOM(link) {
        // create elements
        const domLink = document.createElement("div");
        const anchor = document.createElement("a");
        const icon = document.createElement("div");

        // anchor
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.innerHTML = link.text;
        anchor.classList.add("social-link");

        // icon
        icon.classList.add("social-icon");
        icon.classList.add(link.logo);


        domLink.classList.add("social-link-container");
        domLink.appendChild(icon);
        domLink.appendChild(anchor);
        return domLink;
    }

}


export const socialsPage = new SocialsPage();