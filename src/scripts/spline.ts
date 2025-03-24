export const waitForFooterSplineLoad = () => {
    return new Promise<void>((resolve, reject) => {
        const splineViewer: any | null =
            document.getElementById("SplineViewer");

        if (splineViewer?._loaded) {
            console.log("footer spline is loaded");
            resolve();
        }

        splineViewer?.addEventListener("load-complete", () => {
            console.log("footer spline is loaded");
            resolve();
        });
    });
};
