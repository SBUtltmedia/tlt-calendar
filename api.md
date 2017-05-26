<pre>/user (GET)
Fetches data about the current user.
{
    "firstName": string,
    “lastName”: string,
    "netId": string,
    "email": string
    "isAdmin": bool,  // optional (default: false)
    "managesSites": [int]  // optional (a list of location numbers)
}

/employees (GET)
Fetches a list of all the employees.
[
    {
        // Same fields as user
    }
    ...
]

/admins (GET)
{
	“admins”:[string], //a list of admins netids
	“siteManagers”: {
	[
		{
			“siteId”:[int], “netids”:[string]}  //a list of siteManagers netids
		}
	]
}

Gets admins and site managers


/locations (GET)
Fetches a list of all the locations.
[
    {
        "id": int,
        "name": string,
        "coverage": int  // optional (default: 1)
    }
    ...
]


/schedules (GET)
Fetches the schedule for all locations
[
    {
	"location”: int,  // the ID of the location
	"start_time”: int,  // milliseconds since epoch
	"end_time”: int,  // milliseconds since epoch
	"value": [{  // may be an array of objects, a single object, or a string (“RESERVED”)
		"netId": string,
   	      	"firstName": string,
    	      	“lastName”: string,
                "email": string
    	}
    }
    ...
]
/schedules (POST)
Replaces the current schedule for all locations
Input structure is same as the GET version output
Output is nothing if successful (status code: 204)

/employees/hour-preferences (GET)
Fetches the hour preferences for all employees (if admin)
[{
    "employee": {
        "netId": string,
        "firstName": string,
        “lastName”: string,
        "email": string
      },
      “schedule_id”: int,
      "locationOrder":  [int],  // list of location numbers
      "items": [int]  // 336 values
      "numDesiredHours": int
}
...
]

/employees/:netid/hour-preferences (GET)
Fetches the hour preferences for an employee
{
    "employee": {
        "netId": string,
        "firstName": string,
        “lastName”: string,
        "email": string
      },
      “schedule_id”: int,
      "locationOrder":  [int],  // list of location numbers
      "items": [int]  // 336 values
      "numDesiredHours": int
}

/employees/:netid/hour-preferences (POST)
Replaces the hour preferences for an employee
Input structure is same as the GET version output
Output is nothing if successful (status code: 204)

/employees/:netid/status (GET)
Fetches the status for an employee
{
	"group": string,
	"probation": string,
	"priority": float
}

/employees/:netid/status (POST)
Same structure as the GET version

/employees/status (GET)
Fetches the status for all employees
[
	{
		"netid": string,
		"status": {
			// same format as /employees/:netid/status		
		}
	}
	...
]

/employees/status (POST)
Input structure is same as the GET version output

/slots (GET)
Fetches the slots for all locations (hours open, shift slots, etc.)
[
    {
             "location”: int,  // the ID of the location
	  "start_time”: int,  // milliseconds since epoch
              "end_time”: int,  // milliseconds since epoch
    }
    ...
]

/slots (POST)
Replaces the slots for all locations (hours open, shift slots, etc.)
Input structure is same as the GET version output
Output is nothing if successful (status code: 204)


Possibly needed in future?
/employees/:netid (GET, POST, DELETE)
/locations/:id (GET, POST, DELETE)

Endpoint:
https://apps.tlt.stonybrook.edu/sccal/api/employees/sitemanager/hour
---
For finding the location of the half-hour….

half-hour%48 tells us the half-hour of THAT DAY
half-hour// 7 tells us the DAY
convert half hour to hours and mins.
</pre>
