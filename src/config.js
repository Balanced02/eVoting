const date = new Date();
const d = date.getFullYear();
const siteConfig = {
  siteName: "VotingSys",
  siteIcon: "ion-flash",
  footerText: `Balanced02 ©${d}🇳🇬`
};

const themeConfig = {
  topbar: "themedefault",
  sidebar: "themedefault",
  layout: "themedefault",
  theme: "theme2"
};
const language = "english";
const AlgoliaSearchConfig = {
  appId: "",
  apiKey: ""
};
const Auth0Config = {
  domain: "",
  clientID: "", //
  options: {
    auth: {
      autoParseHash: true,
      redirect: false
    },
    languageDictionary: {
      title: "VotingSys",
      emailInputPlaceholder: "username",
      passwordInputPlaceholder: "password"
    },
    icon: "",
    theme: {
      labeledSubmitButton: true,
      logo: "https://s3.amazonaws.com/redqteam.com/logo/isomorphic.png",
      primaryColor: "#E14615",
      authButtons: {
        connectionName: {
          displayName: "Log In",
          primaryColor: "#b7b7b7",
          foregroundColor: "#000000",
          icon: undefined
        }
      }
    }
  }
};
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
const googleConfig = {
  apiKey: "" //
};
const mapboxConfig = {
  tileLayer: "",
  accessToken: "",
  id: "",
  maxZoom: "",
  defaultZoom: "",
  center: []
};
const youtubeSearchApi = "";

const jwtConfig = {
  fetchUrl: "http://localhost:1337/",
  secretKey: "secretKey"
};

// const jwtConfig = {
//   fetchUrl: "http://vote-sys.herokuapp.com/",
//   secretKey: "secretKey"
// };

export {
  siteConfig,
  themeConfig,
  language,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi,
  jwtConfig
};
