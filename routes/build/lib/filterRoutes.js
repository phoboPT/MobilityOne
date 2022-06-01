"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRoutes = void 0;
const filterRoutes = (paths, allRoutes) => {
    try {
        const final = [];
        paths?.forEach((path) => {
            const splittedPaths = path.split(',');
            const initial = {};
            splittedPaths.forEach((subpath, index) => {
                allRoutes.forEach((route) => {
                    // const finalRoute = { start: '', end: '' };
                    if (subpath === route.startLocation && splittedPaths[index + 1] === route.endLocation) {
                        initial[subpath] = route;
                    }
                });
                if (initial[subpath]) {
                    final.push(initial);
                }
            });
        });
        return final;
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
};
exports.filterRoutes = filterRoutes;
