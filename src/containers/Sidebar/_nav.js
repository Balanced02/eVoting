export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "fa fa-line-chart fa-2x",
      userType: "super"
    },
    {
      name: "Voting Session",
      userType: "super",
      url: "/votingSession",
      icon: "fa fa-calendar fa-2x"
    },
    {
      name: "Voting Category",
      userType: "super",
      url: "/votingCategory",
      icon: "fa fa-ellipsis-v fa-2x"
    },
    {
      name: "Register Voters",
      url: "/registerVoters",
      userType: "super",
      icon: "fa fa-users fa-2x"
    },
    {
      name: "Voters List",
      url: "/votersList",
      userType: "super",
      icon: "fa fa-th-list fa-2x"
    },
    {
      name: "Register Aspirants",
      url: "/aspirants",
      userType: "super",
      icon: "fa fa-registered fa-2x"
    },
    {
      name: "Generate Report",
      url: "/generateReport",
      userType: "super",
      icon: "fa fa-registered fa-2x"
    },
    {
      name: "Cast Vote",
      url: "/vote",
      userType: "voter",
      icon: "fa fa-registered fa-2x"
    }
  ]
};
