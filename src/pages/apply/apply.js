import { ApiClient } from "../../network/api-client";
import { RootPage } from "../root";
import './apply.css';

class ApplicationPage extends RootPage {
    pageTitle = "Apply";
    #responseLeadTime = "2 business days";

    buildPage() {
        const applyWrapper = document.createElement("div");
        const card = document.createElement("div");
        const form = document.createElement("form");
        const heading = document.createElement("h2");

        // wrapper
        applyWrapper.classList.add("apply-wrapper");
        applyWrapper.appendChild(card);

        // card
        card.classList.add("apply-card");
        card.appendChild(heading);
        card.appendChild(form);

        // header
        heading.innerHTML = "Apply Now";

        // form
        form.addEventListener('submit', e => {
            e.preventDefault();
            this.#formSubmitted(e, () => this.#submitSuccess(card));
        });
        form.classList.add("apply-form");
        form.innerHTML = `
            <div class="form-row">
                <label for="applicant_name">Name:</label>
                <input type="text" id="applicant_name" tabindex="1" required name="applicantName">
            </div>

            <div class="form-row">
                <label for="applicant_email">Email:</label>
                <input type="email" id="applicant_email" tabindex="2" required name="applicantEmail">
            </div>

            <div class="form-row">
                <label for="applicant_message">Message:</label>
                <textarea id="applicant_message" tabindex="3" rows="8" name="applicantMessage"></textarea>
            </div>
        
            <div class="form-row">
                <button tabindex="4">Submit</button>
            </div>
        `;

        return applyWrapper;
    }



    #formSubmitted(submitEvent, callback) {
        const data = new FormData(submitEvent.target)
        const { applicantName, applicantEmail, applicantMessage } = Object.fromEntries(data.entries());
        // sanity check
        if (!applicantEmail || applicantEmail.length == 0)
            return;
        if (!applicantName || applicantName.length == 0)
            return;

        // send e-mail and then update card to thank you message
        ApiClient.sendApplicationEmail({ applicantName, applicantEmail, applicantMessage }).then(() => {
            callback();
        });
    }

    #submitSuccess(ref) {
        ref.innerHTML = `
        <div class="submit-success">
            <p class="lg">THANK YOU!</p>
            <p>We are thrilled by your interest! You can expect to hear from us within <span class="lead">${this.#responseLeadTime}</span></p>
        </div>
        `;
    }


}

export const applicationPage = new ApplicationPage();