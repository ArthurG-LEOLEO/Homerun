export const waitForFooterSplineLoad = () => {
    return new Promise<void>((resolve, reject) => {
        const splineViewer: any | null =
            document.getElementById("SplineViewer");

        if (
            !splineViewer ||
            splineViewer?._loaded ||
            window.innerWidth < 1024
        ) {
            console.log("footer spline is loaded");
            resolve();
        }

        splineViewer?.addEventListener("load-complete", () => {
            console.log("footer spline is loaded");
            resolve();
        });
    });
};
