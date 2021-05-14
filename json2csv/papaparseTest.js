var json = [
	{
        "fxh_id": "spm_home_kpi_section-0fa88bcf-1923-4184-b01f-a14ae47b5a6a",
        "user_id": "0fa88bcf-1923-4184-b01f-a14ae47b5a6a",
        "userCompanyId": "925e083c-99f3-40e7-908e-26549be45368",
        "user_email_id": "kapil.lmt@zycus.com",
        "tenantName": "Eircom_QA",
        "product": "SPM",
        "page": "Home",
        "section": "kpi",
        "field": "test1",
        "zycusLocale": "en_US",
        "zycusDateTime": "2020-02-13T07:23:15.453Z",
        "zycusRating": 1,
        "zycusComment": "Test comment",
        "tenantLocale": "fr_FR",
        "tenantDateTime": "2020-02-13T07:15:56.259Z",
        "tenantRating": 1,
        "tenantComment": "Test comment"
      },
      {
        "fxh_id": "spm_home_kpi_section-0fa88bcf-1923-4184-b01f-a14ae47b5a6a",
        "user_id": "0fa88bcf-1923-4184-b01f-a14ae47b5a6a",
        "userCompanyId": "925e083c-99f3-40e7-908e-26549be45368",
        "user_email_id": "kapil.lmt@zycus.com",
        "tenantName": "Eircom_QA",
        "product": "SPM",
        "page": "Home",
        "section": "kpi",
        "field": "test1",
        "zycusLocale": "en_US",
        "zycusDateTime": "2020-02-13T07:23:15.453Z",
        "zycusRating": 1,
        "zycusComment": "Test comment",
        "tenantLocale": "fr_FR",
        "tenantDateTime": "2020-02-13T07:24:37.607Z",
        "tenantRating": 3,
        "tenantComment": "Test comment"
      }
];

let papaParse =  require('papaparse')
const csvData = papaParse.unparse(json);

let fs = require('fs');
fs.writeFile('./out1.csv', csvData, 'utf8', (err)=>{
    if(err) console.log(err);
    console.log("done");
})