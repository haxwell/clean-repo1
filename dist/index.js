/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 746:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 670:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(746);
const github = __nccwpck_require__(670);

/* action should add a "review needed" label to the pull request */

async function run() {
    try {
        const token = core.getInput('github_token');
        const octokit = github.getOctokit(token);

        const context = github.context;
        if (context.eventName !== 'pull_request') {
            core.setFailed('This action can only be run on pull requests.');
            return;
        }

        const { owner, repo } = context.repo;
        const pull_number = context.payload.pull_request.number;

        // Add the "review needed" label
        await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: pull_number,
            labels: ['review needed']
        });

        core.info(`Label "review needed" added to PR #${pull_number}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}
module.exports = __webpack_exports__;
/******/ })()
;