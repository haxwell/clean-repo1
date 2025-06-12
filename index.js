const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    core.info('🔍 Action starting…');
    try {
        // 1. grab inputs
        core.info('1️⃣ Retrieving github_token input');
        const token = core.getInput('github_token');
        if (!token) {
            core.setFailed('❌ github_token is required');
            return;
        }
        core.info('✅ github_token retrieved');

        // 2. initialize octokit
        core.info('2️⃣ Initializing Octokit client');
        const octokit = github.getOctokit(token);

        // 3. check event type
        const context = github.context;
        core.info(`3️⃣ Event name: ${context.eventName}`);
        if (context.eventName !== 'pull_request') {
            core.setFailed('❌ This action can only be run on pull_request events.');
            return;
        }

        // 4. extract repo info
        core.info('4️⃣ Extracting repo and PR number');
        const { owner, repo } = context.repo;
        const pull_number = context.payload.pull_request.number;
        core.info(`   • owner: ${owner}`);
        core.info(`   • repo: ${repo}`);
        core.info(`   • pull request: #${pull_number}`);

        // 5. add the label
        const labelName = 'review needed';
        core.info(`5️⃣ Adding label "${labelName}" to PR #${pull_number}`);
        await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: pull_number,
            labels: [labelName]
        });
        core.info(`✅ Label "${labelName}" successfully added to PR #${pull_number}`);

    } catch (error) {
        core.error(`❗️ An error occurred: ${error.message}`);
        core.setFailed(error.message);
    }
}

run();
