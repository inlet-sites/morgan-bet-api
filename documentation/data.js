window.data = [
    {
        type: "object",
        title: "User",
        id: "user",
        auth: false,
        description: "User Object",
        properties: [
            {
                name: "id",
                type: "String",
                desc: "Unique ID of the user"
            },
            {
                name: "email",
                type: "String",
                desc: "User email address"
            },
            {
                name: "name",
                type: "String",
                desc: "Full name of user"
            }
        ]
    },
    {
        type: "route",
        id: "createUser",
        title: "Create",
        url: "POST /user",
        auth: false,
        description: "Create a new user",
        requestBody: [
            {
                name: "name",
                type: "String",
                desc: "Full name of the user",
            },
            {
                name: "email",
                type: "String",
                desc: "Email address of the user"
            },
            {
                name: "password",
                type: "String",
                desc: "User password"
            },
            {
                name: "confirmPassword",
                type: "String",
                desc: "Confirmation password"
            }
        ],
        responseBody: [
            {
                name: "N/A",
                type: "User",
                desc: "User object"
            }
        ]
    },
    {
        type: "route",
        id: "getUserToken",
        title: "Get Token",
        url: "POST /user/token",
        auth: false,
        description: "Get user token for authorization",
        requestBody: [
            {
                name: "email",
                type: "String",
                desc: "User email address"
            },
            {
                name: "password",
                type: "String",
                desc: "User password"
            }
        ],
        responseBody: [
            {
                name: "token",
                type: "String",
                desc: "User token for authorization"
            }
        ]
    },
    {
        type: "route",
        id: "getUser",
        title: "Get User",
        url: "GET /user/:userId",
        auth: true,
        description: "Get user data",
        responseBody: [{
            name: "N/A",
            type: "User",
            desc: "User object"
        }]
    },
    {
        type: "object",
        id: "rankingGame",
        title: "Ranking Game",
        auth: false,
        description: "Ranking Game object",
        properties: [
            {
                name: "players",
                type: "[Object]",
                desc: "Array of data on the players"
            },
            {
                name: "players.id",
                type: "String",
                desc: "ID of the associated user"
            },
            {
                name: "players.picks",
                type: "[String]",
                desc: "List of team IDs in order of the players picks. Lower index = lower rank"
            },
            {
                name: "teams",
                type: "[Object]",
                desc: "List of teams involved in the game"
            },
            {
                name: "teams.apiId",
                type: "Number",
                desc: "ID for the team in the API"
            },
            {
                name: "teams.name",
                type: "String",
                desc: "Name of the team",
            },
            {
                name: "teams.location",
                type: "String",
                desc: "Location of the team"
            },
            {
                name: "games",
                type: "[Object]",
                desc: "List of games associated with this ranking game"
            },
            {
                name: "games.apiId",
                type: "Number",
                desc: "ID of the game in the API"
            },
            {
                name: "date",
                type: "Date",
                desc: "Date of the game"
            },
            {
                name: "games.teams",
                type: "Object",
                desc: "Teams involed in the game"
            },
            {
                name: "games.teams.home.apiId",
                type: "Number",
                desc: "API ID associated with the home team"
            },
            {
                name: "games.teams.home.score",
                type: "Number",
                desc: "Score of the team in the game, if completed"
            },
            {
                name: "games.teams.away.apiId",
                type: "Number",
                desc: "API ID associated with the away team"
            },
            {
                name: "games.teams.away.score",
                type: "Number",
                desc: "Score of the team in the game, if completed"
            }
        ]
    },
    {
        type: "route",
        id: "rankedGameGetTeams",
        title: "Get Teams",
        url: "GET /rankinggame/teams/:league",
        auth: true,
        description: "Retrieve teams for ranked game",
        responseBody: [
            {
                name: "apiId",
                type: "Number",
                desc: "API ID of the team"
            },
            {
                name: "name",
                type: "String",
                desc: "Name of the team"
            },
            {
                name: "location",
                type: "String",
                desc: "Location of the team"
            }
        ]
    },
    {
        type: "route",
        id: "rankedGameCreate",
        title: "Create",
        url: "POST /rankingGame",
        auth: true,
        description: "Create a new ranked game",
        requestBody: [
            {
                name: "teams",
                type: "[Object]",
                desc: "List of teams to include"
            },
            {
                name: "teams.apiId",
                type: "Number",
                desc: "API ID of the team"
            },
            {
                name: "teams.startDate",
                type: "Date",
                desc: "Start date to find games"
            },
            {
                name: "gamesCount",
                type: "Number",
                desc: "Number of games to include. -1 for all games in season"
            },
            {
                name: "season",
                type: "Number",
                desc: "Season for the games to include"
            }
        ],
        responseBody: [{
            name: "N/A",
            type: "RankingGame",
            desc: "RankingGame object"
        }]
    }
];
