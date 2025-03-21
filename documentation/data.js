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
        url: "GET /user",
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
        title: "MLB Team",
        id: "mlbTeam",
        auth: false,
        description: "Team object for MLB",
        properties: [
            {
                name: "id",
                type: "String",
                desc: "Unique ID of the team"
            },
            {
                name: "name",
                type: "String",
                desc: "Team name"
            },
            {
                name: "location",
                type: "String",
                desc: "Location of the team"
            },
            {
                name: "league",
                type: "String",
                desc: "Team's league"
            },
            {
                name: "division",
                type: "String",
                desc: "Team's division"
            }
        ]
    },
    {
        type: "route",
        id: "getMLBTeams",
        title: "Get",
        url: "GET /mlb/teams?",
        auth: true,
        description: "Retrieve MLB teams",
        queries: [
            {
                name: "league",
                type: "String",
                desc: "Name of the league to retrieve teams for. 'all' for all teams"
            }
        ]
    },
    {
        type: "object",
        title: "Ranking Game",
        id: "rankingGame",
        auth: false,
        description: "Ranking Game object",
        properties: [
            {
                name: "id",
                type: "String",
                desc: "Unique id of the game"
            },
            {
                name: "players",
                type: "[Object]",
                desc: "List of the players and their data"
            },
            {
                name: "players.id",
                type: "String",
                desc: "ID of the player (User)"
            },
            {
                name: "players.picks",
                type: "[String]",
                desc: "List of Team IDs for the users picks."
            },
            {
                name: "owner",
                type: "[Object]",
                desc: "ID of the owner of the game"
            },
            {
                name: "season",
                type: "Number",
                desc: "Year for the season"
            },
            {
                name: "part",
                type: "String",
                desc: "'full', 'firstHalf', or 'secondHalf'"
            },
            {
                name: "joinByDate",
                type: "Date",
                desc: "Final date to join the game"
            }
        ]
    },
    {
        type: "route",
        id: "getRankingGames",
        title: "Get User Games",
        url: "GET /rankinggame",
        auth: true,
        description: "Get all of the games associated with a user. Returns array of Ranking Games",
        responseBody: [{
            name: "N/A",
            type: "RankingGame",
            desc: "Ranking Game object"
        }]
    },
    {
        type: "route",
        id: "getRankingGame",
        title: "Get One",
        url: "GET /rankinggame/:rankingGameId",
        auth: true,
        description: "Get a specific Ranking Game. Includes team data",
        responseBody: [{
            name: "N/A",
            type: "RankingGame",
            desc: "RankingGame object"
        }],
        responseBody: [
            {
                name: "game",
                type: "RankingGame",
                desc: "RankingGame object"
            },
            {
                name: "teams",
                type: "[Object]",
                desc: "Array of team data, including wins"
            },
            {
                name: "teams.id",
                type: "String",
                desc: "ID of the team"
            },
            {
                name: "teams.name",
                type: "String",
                desc: "Name of the team"
            },
            {
                name: "teams.location",
                type: "String",
                desc: "Location of the team"
            },
            {
                name: "teams.league",
                type: "String",
                desc: "League that the team is in"
            },
            {
                name: "teams.win",
                type: "String",
                desc: "Number of games that the team has won"
            }
        ]
    },
    {
        type: "route",
        id: "rankingGameAvailableGames",
        title: "Get Available Games",
        url: "GET /rakinggame/available",
        auth: true,
        description: "Get list of games available for the user to join. Response is an array",
        responseBody: [{
            name: "N/A",
            type: "[RankingGame]",
            desc: "Array of Ranking Games"
        }]
    },
    {
        type: "route",
        id: "createRankingGame",
        title: "Create",
        url: "POST /rankinggame",
        auth: true,
        description: "Create a new Ranking Game",
        requestBody: [
            {
                name: "name",
                type: "String",
                desc: "Name of the game"
            },
            {
                name: "season",
                type: "Number",
                desc: "Season to create game for. Year"
            },
            {
                name: "part",
                type: "String",
                desc: "'full', 'firstHalf', 'secondHalf'"
            },
            {
                name: "league",
                type: "String",
                desc: "'american', 'national', 'all'"
            },
            {
                name: "joinByDate",
                type: "Date",
                desc: "Final date to join the game"
            }
        ],
        responseBody: [{
            name: "N/A",
            type: "RankingGame",
            desc: "Ranking Game object"
        }]
    },
    {
        type: "route",
        id: "rankingGameJoinRequest",
        title: "Join Request",
        url: "PUT /rankinggame/:rankingGameId/join",
        auth: true,
        description: "User make request to join a Ranking Game",
        responseBody: [{
            name: "success",
            type: "true",
            desc: "Always '{success: true}' if no error"
        }]
    },
    {
        type: "route",
        id: "rankingGameAcceptRequest",
        title: "Accept Join Request",
        url: "PUT /rankinggame/:rankingGameId/accept",
        auth: true,
        description: "Owner accept request to join a Ranking Game",
        requestBody: [{
            name: "user",
            type: "String",
            desc: "ID of the user to accept their request"
        }],
        responseBody: [{
            name: "success",
            type: "true",
            desc: "Always '{success: true}' if no error"
        }]
    },
    {
        type: "route",
        id: "rankingGameMakePicks",
        title: "Update picks",
        url: "PUT /rankinggame/:rankingGameId/picks",
        auth: true,
        description: "Create the picks for a user",
        requestBody: [{
            name: "picks",
            type: "[String]",
            desc: "Array of Team IDs in order"
        }],
        responseBody: [{
            name: "N/A",
            type: "RankingGame",
            desc: "Updated RankingGame object"
        }]
    }
];
