// initialize Facebook SDK

// @ts-check
/* eslint-disable */

window.fbAsyncInit = () => {
  FB.init({
    appId: APP_CONFIG.FB_APP_ID,
    version: 'v10.0'
  });
}

document.querySelector('#fb-login').addEventListener('click', () => {
  FB.login(
    (response) => {
    console.log(response)
    fetch(
      `/users/auth/facebook?access_token=${response.authResponse.accessToken}`,
    {
      method: 'POST',
    })
  },
  {scope: 'public_profile,email'});
})


;((d, s, id) => {
   const fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   const js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 })(document, 'script', 'facebook-jssdk');