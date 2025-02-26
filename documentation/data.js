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
    }
];
