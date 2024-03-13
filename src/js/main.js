const body = document.querySelector("body");

const navMobile = document.querySelector(".nav__mobile");
const navMobileLinks = document.querySelectorAll(".nav__mobile--link");
const opennavMobileBtn = document.querySelector(".burger-icon");
const closenavMobileBtn = document.querySelector(".close-mobile-nav");

const desktopNavLinks = document.querySelectorAll(".nav__desktop--link");
const sectionsForScrollSpy = document.querySelectorAll(".scrollSpy");

const allContactInputs = document.querySelectorAll(".input");
const errorInfo = document.querySelector(".contact-form__error");
const contactSendBtn = document.querySelector(".contact-form__button");

const requiredInputs = [];
const completedInputs = [];

const handleScrollSpy = () => {
	if (document.body.classList.contains("main-page")) {
		const sections = [];

		sectionsForScrollSpy.forEach((section) => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 230) {
				sections.push(section);

				const activeSection = document.querySelector(`[href*="${sections[0].id}"]`);

				desktopNavLinks.forEach((item) => item.classList.remove("nav__desktop--link-active"));
				activeSection.classList.add("nav__desktop--link-active");
			}
		});
	}
};

const handleMobileNav = () => {
	navMobile.classList.toggle("nav__mobile--active");
	body.classList.add("overflow-hidden");

	navMobileLinks.forEach((link) => {
		link.addEventListener("click", () => {
			navMobile.classList.remove("nav__mobile--active");
			body.classList.remove("overflow-hidden");
		});
	});
};

const unlockScroll = () => {
	body.classList.remove("overflow-hidden");
};

const closeMobileNav = () => {
	handleMobileNav();
	unlockScroll();
};

const differentNavigations = () => {
	if (document.body.classList.contains("offers-page")) {
		desktopNavLinks[0].classList.remove("nav__desktop--link-active");
		desktopNavLinks[0].setAttribute("href", "index.html");
		desktopNavLinks[1].setAttribute("href", "index.html#about_us");
		desktopNavLinks[2].setAttribute("href", "#");
		desktopNavLinks[2].classList.add("nav__desktop--link-active");
		navMobileLinks[0].setAttribute("href", "index.html");
		navMobileLinks[1].setAttribute("href", "index.html#about_us");
		navMobileLinks[2].setAttribute("href", "#");
	} else if (document.body.classList.contains("contact-page")) {
		desktopNavLinks[0].classList.remove("nav__desktop--link-active");
		desktopNavLinks[0].setAttribute("href", "index.html");
		desktopNavLinks[1].setAttribute("href", "index.html#about_us");
		desktopNavLinks[2].setAttribute("href", "offers.html");
		desktopNavLinks[3].setAttribute("href", "#");
		desktopNavLinks[3].classList.add("nav__desktop--link-active");
		navMobileLinks[0].setAttribute("href", "index.html");
		navMobileLinks[1].setAttribute("href", "index.html#about_us");
		navMobileLinks[2].setAttribute("href", "offers.html");
		navMobileLinks[3].setAttribute("href", "#");
	}
};

const checkRequiredInputs = () => {
	allContactInputs.forEach((el) => {
		if (el.classList.contains("required")) {
			requiredInputs.push(el);
		}
	});
};

const checkContactForm = () => {
	const completedInputs = requiredInputs.every((input) => input.value != 0);
	if (completedInputs == true) {
		errorInfo.innerText = "Dziękujemy za wysłanie pytania.";
		errorInfo.classList.add("green-alert");
		errorInfo.classList.remove("visibility-hidden");
		clearContactForm();
		hideError();
	} else {
		errorInfo.classList.remove("green-alert");
		errorInfo.classList.add("red-alert");
		errorInfo.innerText = "- Wypełnij wymagane pola -";
		errorInfo.classList.toggle("visibility-hidden");
		hideError();
	}
};

const hideError = () => {
	setTimeout(() => {
		errorInfo.classList.add("visibility-hidden");
	}, 4000);
};

const clearContactForm = () => {
	allContactInputs.forEach((el) => {
		el.value = "";
	});
};

window.addEventListener("scroll", handleScrollSpy);
opennavMobileBtn.addEventListener("click", handleMobileNav);
closenavMobileBtn.addEventListener("click", closeMobileNav);
// closenavMobileBtn.addEventListener("click", unlockScroll);
differentNavigations();

checkRequiredInputs();
contactSendBtn.addEventListener("click", (e) => {
	e.preventDefault();
	checkContactForm();
});
