function regexCheck(word){
    if(word.match(/\\[\s.*+?^${}()|[\]\\]/g)){
        console.log(true);
    } else{
        console.log(false);
    }
}

regexCheck("language management tool_master_audittrail_section")
regexCheck("einvoice_createnonpo_additems_section")
// {identifier: {$regex: "( |\\&|\\@|\\.|\\?|\\^|\\$|\\||\\[|\\]|\\*|\\+|\\(|\\)|\\%|\\!|\\#)"}}