const a = {
    supplier: false
};
const lodash = require('lodash');

function getTMSServiceURL(isBuyerTMS=false){
    console.log(a.supplier);
    const isSupplierTMS = a.supplier;
    if(isSupplierTMS & isBuyerTMS===false ){
        return "supplierURL"
    }else{
        return "buyerURL"
    }
}

function getComments(parsedData){
    const output = (parsedData["comments"] && Array.isArray(parsedData["comments"]) && parsedData["comments"].length > 0) ? parsedData["comments"].find((data)=> data.commmentId === 1600089179958) : [];
    return output
}

// console.log(getTMSServiceURL());
// console.log(getTMSServiceURL(true));
// console.log(getTMSServiceURL(false));
const data = {
    "comments": [
        {
            "commmentId": 1600089179958,
            "commentTitle": "Test Title",
            "commentMessage": "Akram and Akash test",
            "userName": "TataSky eircom user name supp and ellipse check for listing page",
            "userEmailID": "eircom_supp@zycus.com",
            "commentDate": 1600089179958,
            "isParent": false,
            "supplierId": "2139521",
            "supplierName": "DELL",
            "companyId": "925e083c-99f3-40e7-908e-26549be45368",
            "attachments": [
                {
                    "attachmentId": "5f5f6c5be4b013aebf2011ad",
                    "fileName": "upload_b49e055aa9324f1de5f8c664564c6b2f.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600089179961",
                    "date": 1600089179961,
                    "fileSize": 7935
                },
                {
                    "attachmentId": "5f5f6ef6e4b013aebf2011b9",
                    "fileName": "upload_c54f3245d3c7ea5167b1a4e108ed2fe6.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600089846540",
                    "date": 1600089846540,
                    "fileSize": 1411465
                },
                {
                    "attachmentId": "5f5f6f2ee4b03a1e327314c2",
                    "fileName": "upload_bc0e9ce27a8d54f4e443d3607440b164.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600089902224",
                    "date": 1600089902224,
                    "fileSize": 1411465
                },
                {
                    "attachmentId": "5f5f6fc6e4b013aebf2011c0",
                    "fileName": "upload_c57e6c6330805d47ebc3baba82bf55bb.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600090054134",
                    "date": 1600090054134,
                    "fileSize": 1411465
                },
                {
                    "attachmentId": "5f5f6fdde4b03a1e327314c9",
                    "fileName": "upload_cb0a24d2d4d7992cd7212b0e81fd2e5d.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600090077828",
                    "date": 1600090077828,
                    "fileSize": 1411465
                },
                {
                    "attachmentId": "5f5f7046e4b013aebf2011c7",
                    "fileName": "upload_ef54bd3a4b0eec8eacb87fbb02fcfb03.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600090182060",
                    "date": 1600090182060,
                    "fileSize": 1411465
                },
                {
                    "attachmentId": "5f5f722fe4b013aebf2011ce",
                    "fileName": "670788.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600090671226",
                    "date": 1600090671226,
                    "fileSize": 1411465
                },
                {
                    "attachmentId": "5f5f7259e4b03a1e327314d0",
                    "fileName": "670788.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600090713264",
                    "date": 1600090713264,
                    "fileSize": 1411465
                },
                {
                    "attachmentId": "5f5f7278e4b013aebf2011d5",
                    "fileName": "1.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600090744317",
                    "date": 1600090744317,
                    "fileSize": 7935
                },
                {
                    "attachmentId": "5f5f7e76e4b03a1e327314d7",
                    "fileName": "1.jpg",
                    "contentType": "image/jpeg",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600093814146",
                    "date": 1600093814146,
                    "fileSize": 7935
                },
                {
                    "attachmentId": "5f5f7f42e4b013aebf2011d7",
                    "fileName": "MicrosoftTeams-image.png",
                    "contentType": "image/png",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600094018463",
                    "date": 1600094018463,
                    "fileSize": 106856
                },
                {
                    "attachmentId": "5f5f7ff9e4b03a1e327314d9",
                    "fileName": "MicrosoftTeams-image.png",
                    "contentType": "image/png",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600094201067",
                    "date": 1600094201067,
                    "fileSize": 106856
                },
                {
                    "attachmentId": "5f5f80b7e4b013aebf2011d9",
                    "fileName": "hello.txt",
                    "contentType": "text/plain",
                    "companyId": "925e083c-99f3-40e7-908e-26549be45368",
                    "userName": "TataSky eircom user name supp and ellipse check for listing page",
                    "userEmailID": "eircom_supp@zycus.com",
                    "supplierId": "2139521",
                    "supplierName": "DELL",
                    "attachmentDate": "1600094391775",
                    "date": 1600094391775,
                    "fileSize": 13
                }
            ]
        },
        {
            "commmentId": 1590475809105,
            "commentTitle": "My comment new",
            "commentMessage": "mineeesdsdsd",
            "userName": "ericom",
            "userEmailID": "eircom_supp@zycus.com",
            "commentDate": 1590475587,
            "isParent": true,
            "supplierId": "2139521",
            "supplierName": "DELL",
            "companyId": "925e083c-99f3-40e7-908e-26549be45368",
            "attachments": []
        }
    ]
}
// console.log(getComments(data));

function assignPSF(id){
    const data = {
        page: '',
        section: '',
        field: ''
    };
    if(lodash.isEmpty(data.page) || lodash.isEmpty(data.section) || lodash.isEmpty(data.field)){
        const splitData = id.split("_");
        if(lodash.isEmpty(data.page)){
            data.page = splitData[1];
        }
        if(lodash.isEmpty(data.section) && !lodash.isEmpty(splitData[2]) && splitData[2] !== "page"){
            data.section = splitData[2];
        }
        if(lodash.isEmpty(data.field) && !lodash.isEmpty(splitData[3]) && splitData[3] !== "section"){
            data.field = splitData[3];
        }
    }
    return data;
}

console.log(assignPSF('icontract_home_page'));
console.log(assignPSF('dewdrops_userprofile_location(ppp)details_section'));
console.log(assignPSF('imanage_createphasestasks_managephasesandtasks_status_field'));