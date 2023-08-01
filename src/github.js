import { graphql } from "@octokit/graphql";


export async function processedContributions(username) {
        const currentYear = new Date().getFullYear();
        const contributions = await getContributionsData(username);
        const processedContributionsData = {};

  // Expert data
  processedContributionsData['expert'] = {
    name: contributions[currentYear]?.user?.name || contributions[currentYear]?.user?.login,
    login: contributions[currentYear]?.user?.login,
    bio: contributions[currentYear]?.user?.bio,
    followers: contributions[currentYear]?.user?.followers?.totalCount || 0,
  };
  // Initialize total counts
  let totalContributions = 0;
  let totalIssueContributions = 0;
  let totalPullRequestContributions = 0;
  let totalCommitContributions = 0;
  let totalRepositoryContributions = 0;
  let totalPullRequestReviewContributions = 0;
  let totalDiscussionContributions = contributions[currentYear]?.user?.repositoryDiscussionComments?.totalCount || 0;

  processedContributionsData['years'] = {};

  // Loop through the contributions for each year
  for (const yearname in contributions) {
    if (!contributions[yearname]) {
      continue;
    }

    const year = contributions[yearname];

    // Annual Contributions
    const yearContributions =
      year?.user?.contributionsCollection?.totalCommitContributions +
      year?.user?.contributionsCollection?.totalIssueContributions +
      year?.user?.contributionsCollection?.totalPullRequestContributions +
      year?.user?.contributionsCollection?.totalRepositoryContributions +
      year?.user?.contributionsCollection?.totalPullRequestReviewContributions;

    const yearIssueContributions = year?.user?.contributionsCollection?.totalIssueContributions || 0;
    const yearPullRequestContributions = year?.user?.contributionsCollection?.totalPullRequestContributions || 0;
    const yearCommitContributions = year?.user?.contributionsCollection?.totalCommitContributions || 0;
    const yearRepositoryContributions = year?.user?.contributionsCollection?.totalRepositoryContributions || 0;
    const yearPullRequestReviewContributions = year?.user?.contributionsCollection?.totalPullRequestReviewContributions || 0;

    if (yearContributions === 0) {
      continue;
    }

    totalContributions += yearContributions;
    totalIssueContributions += yearIssueContributions;
    totalPullRequestContributions += yearPullRequestContributions;
    totalCommitContributions += yearCommitContributions;
    totalRepositoryContributions += yearRepositoryContributions;
    totalPullRequestReviewContributions += yearPullRequestReviewContributions;

    processedContributionsData['years'][yearname] = {
      contributions: yearContributions,
      issueContributions: yearIssueContributions,
      pullRequestContributions: yearPullRequestContributions,
      commitContributions: yearCommitContributions,
      repositoryContributions: yearRepositoryContributions,
      pullRequestReviewContributions: yearPullRequestReviewContributions,
    };

    if (year?.user?.contributionsCollection?.commitContributionsByRepository) {
      processedContributionsData['years'][yearname]['repositories'] = {};

      year?.user?.contributionsCollection?.commitContributionsByRepository.forEach((repo) => {
        processedContributionsData['years'][yearname]['repositories'][repo.repository.name] = {
          contributions: repo.contributions.totalCount || 0,
          stargazers: repo.repository.stargazerCount || 0,
          name: repo.repository.name,
          owner: repo.repository.owner.login,
          description: repo.repository.description || null,
          fullname: `${repo.repository.owner.login}/${repo.repository.name}`,
          languages: repo.repository.languages.edges,
        };

        processedContributionsData['years'][yearname]['repositories'][repo.repository.name]['languages'].forEach(
          (language) => {
            if (language.node?.name) {
              // Calculate whether the text on the color should be light or dark for contrast
              const hex = language.node.color.replace('#', '');
              const rgb = hex.match(/.{2}/g).map((x) => parseInt(x, 16));
              const contrast =
                Math.sqrt(
                  rgb[0] * rgb[0] * 0.299 + rgb[1] * rgb[1] * 0.587 + rgb[2] * rgb[2] * 0.114
                ) > 130
                  ? 'black'
                  : 'white';
              language.node.contrast = contrast;
            }
          }
        );
      });
    }
  }

  // Sort the top repositories by contributions
  const topRepositories = Object.values(processedContributionsData['years'])
    .filter((year) => year.repositories)
    .map((year) => year.repositories)
    .flat()
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 5);

  // Sort the top repositories by stargazers
  const topRepositoriesByStargazers = [...topRepositories].sort((a, b) => b.stargazers - a.stargazers);

  processedContributionsData['topRepositories'] = topRepositories;
  processedContributionsData['topRepositoriesByStargazers'] = topRepositoriesByStargazers;

  const listOfAllRepos = {};
  processedContributionsData['totals'] = {
    contributions: totalContributions,
    issueContributions: totalIssueContributions,
    pullRequestContributions: totalPullRequestContributions,
    commitContributions: totalCommitContributions,
    repositoryContributions: totalRepositoryContributions,
    pullRequestReviewContributions: totalPullRequestReviewContributions,
    discussionContributions: totalDiscussionContributions,
    totalRepos: Object.keys(listOfAllRepos).length,
  };

  // Languages processing
  const languages = {};

  for (const yearname in processedContributionsData['years']) {
    if (!processedContributionsData['years'][yearname].repositories) {
      continue;
    }
    const repos = processedContributionsData['years'][yearname].repositories;
    for (const reponame in repos) {
      const repo = repos[reponame];
      for (const language of repo.languages) {
        if (!languages[language.node.name]) {
          // Calculate whether the text on the color should be light or dark for contrast
          const hex = language.node.color.replace('#', '');
          const rgb = hex.match(/.{2}/g).map((x) => parseInt(x, 16));
          const contrast =
            Math.sqrt(
              rgb[0] * rgb[0] * 0.299 + rgb[1] * rgb[1] * 0.587 + rgb[2] * rgb[2] * 0.114
            ) > 130
              ? 'black'
              : 'white';

          languages[language.node.name] = {
            name: language.node.name,
            color: language.node.color,
            contrast: contrast,
            size: language.size,
            count: 1,
            contributions: repo.contributions,
            rank: repo.contributions * language.size,
          };
        } else {
          languages[language.node.name].size += language.size;
          languages[language.node.name].count += 1;
          languages[language.node.name].contributions += repo.contributions;
          languages[language.node.name].rank += repo.contributions * language.size;
        }
      }
      // Add to list of all repos if it's not there
      if (!listOfAllRepos[repo.fullname]) {
        listOfAllRepos[repo.fullname] = repo.fullname;
      }
    }
  }

  processedContributionsData['languages'] = Object.values(languages).sort((a, b) => b.rank - a.rank);

  return processedContributionsData;
}


export async function getContributionsData(username) {

    if(localStorage.getItem("contributions")) {
       return JSON.parse(localStorage.getItem("contributions"));
    }
    const startYear = 2008;
    const endYear = new Date().getFullYear();
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    const contributionsData = {};
    const contributions = await Promise.all(
        years.map(async (year) => {
            const from = `${year}-01-01T00:00:00.000Z`;
            const to = `${year}-12-31T23:59:59.999Z`;
            const response = await getContributions(username, from, to);
            contributionsData[year] = response;
        })
    );
    localStorage.setItem("contributions", JSON.stringify(contributionsData));
    // Put it in local storage
    
}



export async function getContributions(username, from, to) {
  const query = `
    query ($username: String!, $from: DateTime, $to: DateTime) {
		user(login: $username) {
			name
            login
            bio
            followers {
                totalCount
            }
            repositoryDiscussionComments(onlyAnswers: true) {
                totalCount
            }
			contributionsCollection(from: $from, to: $to) {
				totalCommitContributions
				totalIssueContributions
				totalCommitContributions
				totalRepositoryContributions
				totalPullRequestContributions
				totalPullRequestReviewContributions
				
				commitContributionsByRepository(maxRepositories: 100) {
					contributions {
					  totalCount
					},
					repository {
						name,
                        description,
            stargazerCount
						owner {
							login
						}
						languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
							edges {
								size
								node {
									color
									name
									id
								}
							}
						}
					}
				}
			}
		}
	}
  `;
  
  try {
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token YOUR_TOKEN_HERE`,
      },
    });

    const response = await graphqlWithAuth(query, {
      username: username,
      from: from,
      to: to,
    });
    return response;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return null; // Handle the error gracefully and return null.
  }
}