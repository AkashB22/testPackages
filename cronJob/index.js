const schedule = require('node-schedule'),
    axios = require('axios'),
    moment = require('moment'),
    date = moment().format("yyyy-MM-DD"),
    count = 0;
token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsY1pWMF82VTNza2RKU19GOV9qdGNMNXotNlZPc05EaGNuZ1lLNHFHaVJvIn0.eyJqdGkiOiJmZjE5NTVhMC0xMTJkLTQxZTktYTk3YS1kNGU5MGY2ZmI1MDkiLCJleHAiOjE5MjIxNzkwMzMsIm5iZiI6MCwiaWF0IjoxNjA2ODE5MDMzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtYXBzMS0wMC1hbGIta2V5Y2xvYWstMjAzODM0MDkxMS5hcC1zb3V0aC0xLmVsYi5hbWF6b25hd3MuY29tL2F1dGgvcmVhbG1zL3Byb2R1Y3Rpb24iLCJhdWQiOiIzODMxNGJkMS0yZGJiLTQwNTEtOTRhYS1mNTQzMTdlZGM1NDEiLCJzdWIiOiJhNzY2M2RjNC0yMWNmLTQ2MDEtODIyNS1lYmM3MGQzZjdmMDEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiIzODMxNGJkMS0yZGJiLTQwNTEtOTRhYS1mNTQzMTdlZGM1NDEiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJiZmJlNmViNC0yNWI4LTRkMGYtYjdiOS1iMDEzMTljOWYwZmEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im1lc3NhZ2U6Z2V0IGFnZW50OnVwZGF0ZSBkYXNoYm9hcmQ6cmVhZCBhZ2VudDpyZWFkIG1lc3NhZ2U6Y3JlYXRlIGFnZW50OmRlbGV0ZSByZXBvcnRzOnJlYWQgY29udmVyc2F0aW9uOnVwZGF0ZSByZXBvcnRzOmV4dHJhY3QgdXNlcjp1cGRhdGUgYWdlbnQ6Y3JlYXRlIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHVzZXI6cmVhZCBmaWx0ZXJpbmJveDpyZWFkIG91dGJvdW5kbWVzc2FnZTpnZXQgcm9sZTpyZWFkIHJlcG9ydHM6ZmV0Y2ggZmlsdGVyaW5ib3g6Y291bnQ6cmVhZCBjb252ZXJzYXRpb246cmVhZCB1c2VyOmRlbGV0ZSBjb252ZXJzYXRpb246Y3JlYXRlIG91dGJvdW5kbWVzc2FnZTpzZW5kIGJpbGxpbmc6dXBkYXRlIHVzZXI6Y3JlYXRlIiwiY2xpZW50SWQiOiIzODMxNGJkMS0yZGJiLTQwNTEtOTRhYS1mNTQzMTdlZGM1NDEiLCJjbGllbnRIb3N0IjoiMTAuNjguMTUuMzkiLCJjbGllbnRBZGRyZXNzIjoiMTAuNjguMTUuMzkifQ.YeoMsc0vGS4qKGY0B0qfHbbGf2sTGdXZH0l5VmJstlfmXSQ19JV9OB59JWizBd1TiDDMQPXFcsIeNhC650m9NTChGqox-F2G7YBTviEdI9TuuvFoW3sfcmRB0aWROuAAKBr82ZhHUFYv9TL04VhBTmB0hUcTUgwESfSFIfM6dU7jGGQeIF-uHNsCtH4X95RNnq01BL-iIkoLEa5hytHqmZVjNn3Qc-aRovSySqA0S0ni3DiqIJEcg56cs3NBdyvUCznxhTFfHfhDwC8Vq88Y5v6bkLPmUlz_ba1Ru3agshIRyKltq5cAqLEILcpQNeSj8AdMOOpvGgq_hQsNvOd-8w",
    fs = require('fs'),
    https = require('https');

setInterval(() => {
    fetchReport()
}, 120000)


function fetchReport() {
    axios({
        method: 'post',
        headers: { Authorization: `Bearer ${token}` },
        url: 'https://zycus.freshchat.com/v2/reports/raw/',
        data: {
            "start": date + "T00:01:00.000Z",
            "end": date + "T23:59:00.000Z",
            "event": "Conversation-Created",
            "format": "csv"
        }

    }).then(response => {

        console.log(response.data)

    }).catch(err => {
        console.log(err)
    });

}