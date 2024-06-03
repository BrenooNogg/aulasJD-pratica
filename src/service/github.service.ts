import gitHubApi from '@/service/api.service';

export const getUser = async (username: string) => {
    try {
        const response = await gitHubApi.gitHubApi.get(`/${username}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getUserRepos = async (username: string) => {
    try {
        const response = await gitHubApi.gitHubApi(`/${username}/repos`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
