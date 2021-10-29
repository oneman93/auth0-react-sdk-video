#This project is copied from:
https://www.youtube.com/watch?v=1rgeO_EbSGg
git@github.com:auth--blog/auth--react-sdk-video.git




#Call api:
https://auth0.com/docs/authorization/flows/call-your-api-using-the-authorization-code-flow-with-pkce

Complete guide:
https://auth0.com/blog/complete-guide-to-react-user-authentication/#Get-the-Starter-Application

Youtube video for complete guide:
https://www.youtube.com/watch?v=PYWS-4CXETw



#Auth0 API doc:
https://auth0.com/docs/api/management/v2#!/Users/get_users

#Get users api
https://auth0.com/docs/users/user-search/retrieve-users-with-get-users-endpoint




#Todo list
1. git create
2.1 convert app.js class component
2.2 set state with history
3. show history


#Convert function component to react class component
https://yogeshchauhan.com/how-to-convert-a-function-component-into-a-class-in-react/
https://stackoverflow.com/questions/43695583/converting-react-function-component-to-class-component-issue

The other way around:
https://nimblewebdeveloper.com/blog/convert-react-class-to-function-component



#Sharing state between components
https://stackoverflow.com/questions/41825557/accessing-parent-state-in-child-in-react

I think below is the one to look at:
https://stackoverflow.com/questions/39963565/react-passing-down-props-to-functional-components


  // const changeHandler = e => {
  //   setAllValues(preValues => {
  //     return {...preValues, [e.target.name]: e.target.value}
  //   })
  // };
  
#useState with multiple values
https://stackoverflow.com/questions/59813926/usestate-to-update-multiple-values-in-react


#passing props to route component
https://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component


#debugger
video: https://code.visualstudio.com/docs/introvideos/debugging
Stop 02:07 to see how to set.
good doc: https://code.visualstudio.com/docs/nodejs/reactjs-tutorial

#git commit
git status
git add .
git commit -m 'setState tried in useEffect, but not working'
git push

//signup
https://matthewoh93.au.auth0.com/u/login?state=hKFo2SBGTGs5VmVvdzhILXR0Y05aS2NGNGdIYWFSZEpmZGVaeKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGhYMi1OTC0wWE14djhtMXlMcGZoa2hTZmZEYW1JSlZ3o2NpZNkgVEZjTHpINERiQlhieTNhV0pvNUR0TDczb2dKb0pMMUc

// sign in
https://matthewoh93.au.auth0.com/u/login?state=hqFo2SB0b1VOdXRrRm5GYjl4Sm1teHFWcWpaSVItenRPTjljMaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIE11cTJDbFFxa2p5dVZDZWRlR2NVUDJ6TDNleHRVQTNxo2NpZNkgVEZjTHpINERiQlhieTNhV0pvNUR0TDczb2dKb0pMMUelb3JnaWS0b3JnX0FTazQ3UVYwcU5qc3Rmalenb3JnbmFtZaNqbmo

How to redirect to a different page based on signup vs login screen?
https://community.auth0.com/t/how-to-redirect-to-a-different-page-based-on-signup-vs-login-screen/60258


At one stage, loginWithRedirect() returned below url:
https://undefined/authorize?onRedreictCallback=appState%20%3D%3E%20%7B%0A%20%20%20%20history.push((appState%20%3D%3D%3D%20null%20%7C%7C%20appState%20%3D%3D%3D%20void%200%20%3F%20void%200%20%3A%20appState.returnTo)%20%7C%7C%20window.location.pathname)%3B%0A%20%20%7D&redirect_uri=http%3A%2F%2Flocalhost%3A3000&organization=org_ASk47QV0qNjstfjW&scope=openid%20profile%20email&response_type=code&response_mode=query&state=NVd3V2ZqSlQ4eVBQOHlHak5DNWk5aDdLTkExbVFUcVhRbX5YOElrM2ZCWQ%3D%3D&nonce=cFdVUWxpdjhSU0t5SElxcmtia0dyT195RXlQVHg3ejBnazc4Sy1VTWhqNQ%3D%3D&code_challenge=n_wdM9tQPR5syTc1wdxAdgi2kZGZreaqv2CwLliYuBg&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS44LjAifQ%3D%3D
Resolution: delete .env and create again !!!


history.push does not refresh the page
https://stackoverflow.com/questions/42941708/react-history-push-is-updating-url-but-not-navigating-to-it-in-browser


React BrowseRouter, good one!
https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/

Redux, useContext
https://daveceddia.com/context-api-vs-redux/

useCallback
https://www.youtube.com/watch?v=-Ls48dd-vJE

getaccesstokensilently with organization
https://community.auth0.com/t/user-switch-between-organization/62609
https://community.auth0.com/t/how-to-automatically-select-organizations-during-login/63599/2
https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#5-use-with-auth0-organizations
