/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface Window {
    gsap: typeof import("gsap").gsap;
    lenis: typeof import("lenis").lenis;
    Observer: typeof import("gsap").Observer;
}
