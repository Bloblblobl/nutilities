import { spotifyAuthorize } from './functions';

function redirectToAuthorize() {
    spotifyAuthorize().then((result) => {
        window.location.href = result.data.redirectURL;
    });
}

export {
    redirectToAuthorize,
};