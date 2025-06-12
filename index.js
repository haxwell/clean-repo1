const core = require('@actions/core');
const github = require('@actions/github');

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