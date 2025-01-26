import { RootPage } from "../root";
import './start.css';


export class StartPage extends RootPage {
    pageTitle = "start";

    buildPage()
    {
        // create elements
        const page = document.createElement("div");
        const videoContainer = document.createElement("div");
        const iframe = document.createElement("iframe");
        const explainer = document.createElement("div");
        const gutters = document.createElement("div");
        const heading = document.createElement("h2");

        // start page main container
        page.classList.add('start-page');
        page.appendChild(videoContainer);
        page.appendChild(explainer);

        // video wrapper
        videoContainer.classList.add('vid-container');
        videoContainer.appendChild(iframe);

        // explainer
        explainer.classList.add('explainer');
        explainer.appendChild(heading);
        explainer.appendChild(gutters);

        // gutters
        gutters.classList.add("gutters");
        gutters.innerHTML = `
        <p>Founded in 2025, Little Guys Games is an independent game studio based in Tulsa, OK, with a mission to support and empower new game developers.</p>
        <p>Born out of the challenges faced by our founder during their own journey into game development, the studio was created as a space where aspiring developers can learn, grow, and build a portfolio while collaborating with a team of passionate peers.</p>
        <p>At Little Guys Games, we believe that everyone deserves a chance to pursue their dreams, regardless of their background or level of experience.</p> 
        <p>We provide opportunities for driven individuals to gain hands-on experience, overcome barriers to entry in the industry, and prepare for their next steps—whether that is joining a AAA studio or continuing to create innovative games with us.</p>
        <p>Our team understands what it is like to start small but dream big. Thanks to faith, family, and friends, we have turned this vision into reality, and we are excited to help others do the same.</p>
        <p>Little Guys Games is made by the little guys, for the little guys, because that's who we are, and that's who we care about.</p>`;

        // heading
        heading.innerHTML = "let me explain...";

        // iFrame
        iframe.src = "https://www.youtube.com/embed/8y43hm29eWY?autoplay=1&controls=1";
        iframe.title = "YouTube video player";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;



        return page;
    }
}


export const startPage = new StartPage();