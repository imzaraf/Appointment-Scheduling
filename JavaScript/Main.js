// import appointmentDB, {bulkcreate, getDataCount, createDynamicElement  }from './Module.js';
const appointmentDB = (dbName,dbTable) => {


    const DB = new Dexie (dbName);
    
    DB.version(1).stores(dbTable);  
    
    DB.open();
    
    return DB;
    }

    let db = appointmentDB('dbName', {
        Info : '++Id, Title, Name, Phone_Number, Email, Start_Date, End_Date , Location'
    });
    
    
    
    //Input Tags
    
    const text_id = document.getElementById("text-id");
    const text_title = document.getElementById("text-title");
    const text_name = document.getElementById("text-name");
    const text_phoneNumber = document.getElementById("text-phoneNumber");
    const text_email = document.getElementById("text-email");
    const text_startDate = document.getElementById("text-startDate");
    const text_endDate = document.getElementById("text-endDate");
    const text_location = document.getElementById("text-location");
    
   
    //Button Tag
    
    
    const btn_submit = document.getElementById("btn-submit");
    const btn_display = document.getElementById("btn-display");
    const btn_update = document.getElementById("btn-update");
    const btn_delete = document.getElementById("btn-delete");
    
    
    //notfound
    const notFound = document.getElementById("notFound")
    
    
    
    
    //Submit info to DB using submit button
    
    
    btn_submit.onclick = (event) => {
        notFound.textContent = ""
    
        let flag = bulkcreate(db.Info, {
            Title : text_title.value,
            Name : text_name.value,
            Phone_Number : text_phoneNumber.value,
            Email : text_email.value,
            Start_Date : text_startDate.value,
            End_Date : text_endDate.value,
            Location : text_location.value
         })
         console.log(flag);
    
    
         text_title.value = text_name.value = text_startDate.value = text_phoneNumber.value = text_email.value = text_endDate.value = text_location.value = ""; 
         
         getDataCount(db.Info, (data) => {
    text_id.value = data.Id +1 || 1;
        });

        //showTable();

        let insMsg = document.querySelector(".insMsg")

        getMsg(flag, insMsg);
        }
    
    //Display info from DB using Display button
    
    
    btn_display.onclick = showTable;
    
    
    
    
    //ShowTable Function Body
    
    function showTable () {
        
        
        const tBody = document.getElementById("tBody");
        tBody.focus();
        while(tBody.hasChildNodes()){
            tBody.removeChild(tBody.firstChild);
        }
    
        createDynamicElement("td", tBody, (td) => {
            getDataCount(db.Info, (data) => {
                
    
                if(data)
                {
                    createDynamicElement("tr", tBody, tr => {
                            
                        for (const value in data)
                        {
                            createDynamicElement("td", tr, td => {
                                td.textContent = data[value];
                                
    
                            })
                        }
                        createDynamicElement("td", tr, td =>{
                            createDynamicElement("i", td, i=>{
                                i.className+= "fas fa-edit btnedit";
                                i.setAttribute('data-id', data.Id);
                                i.onclick = editbtnfn;
                            })
                        })

                        createDynamicElement("td", tr, td =>{
                            createDynamicElement("i", td, i=>{
                                i.className+= "fas fa-trash-alt btndeleteicon";

                                i.setAttribute('data-id', data.Id);
                                i.onclick = deletebtnfn;
                            })
                        })
                    })
                }
                else
                {
                    notFound.textContent = "No Record Found"
                }
        })
    
    
    })
    }
    
    //Edit Icon Function

    function editbtnfn (event)
    {
        let id =parseInt(event.target.dataset.id) ;

        db.Info.get(id,data=>{

            text_id.value = data.Id || 0;
            text_title.value = data.Title || ""
            text_name.value = data.Name || ""
            text_phoneNumber.value = data.Phone_Number || ""
            text_email.value = data.Email || ""
            text_startDate.value = data.Start_Date || ""
            text_endDate.value = data.End_Date || ""
            text_location.value = data.Location || ""
        })
        
    }

    
    //Update Function
    
    btn_update.onclick = () => {
        notFound.textContent = ""

        const id = parseInt(text_id.value || 0);

        if(id)
        {
            db.Info.update(id, {
                Title : text_title.value,
                Name : text_name.value,
                Phone_Number : text_phoneNumber.value,
                Email : text_email.value,
                Start_Date : text_startDate.value,
                End_Date : text_endDate.value,
                Location : text_location.value
            }).then((updated) =>{
                let flag;
                let get = updated? flag= true:flag = false;

                let updMsg = document.querySelector(".updMsg")
                getMsg(flag, updMsg);
                text_title.value = text_name.value = text_startDate.value = text_phoneNumber.value = text_email.value = text_endDate.value = text_location.value = ""; 


                if(flag)
                {
                    showTable();



                }
    
               
            })
        }
    }


//Delete Icon Function

function deletebtnfn (event)
{
let id = parseInt(event.target.dataset.id);
db.Info.delete(id);
showTable()


}


//Delete All Function
btn_delete.onclick = () => {
    let flag = db.delete();

    console.log(flag);

    db = appointmentDB('dbName', {
        Info : '++Id, Title, Name, Phone_Number, Email, Start_Date, End_Date , Location'
    });
    db.open();
    showTable();

    textId(text_id);

let delMsg = document.querySelector(".delMsg");
getMsg(true, delMsg);
}

//window load function

window.onload = () =>
{
textId(text_id)

}

function textId(textBoxId)
{
    getDataCount(db.Info, data=>{
        textBoxId.value = data.id + 1 || 1
    })
}



function getMsg(flag, element)
{
    if(flag)
    {
        element.className += " movedown";
        setTimeout(() =>{
            element.classList.forEach(classname =>
                {
                    classname == "movedown"? undefined:element.classList.remove("movedown")
                })

        },4000)
    }
}

// Functions of module
//Submit Function
const bulkcreate = (dbTable, data) => {
    
    let flag = empty(data);
    if(flag)
    {
        dbTable.bulkAdd([data]);
        console.log("Data Submitted Successfully.");
    }
    else{
        console.log("Please Provide the Data.");
    }    
return flag;
}

//check textbox validation

const empty = object => {
    let flag = false;

    for(const value in object)
    {
        if(object[value] != "" && object.hasOwnProperty(value))
        {
            flag = true;
        }else{
            flag = false;
        }
    }

    return flag;
}

//getData from DB

const getDataCount= (dbTable,fn) =>{
    let index = 0;
    let obj = {};

  dbTable.count((count)=>{
        if(count){
            dbTable.each(table =>{
                
                obj = sortObj(table);
                fn(obj, index++)
            })
        }
        else{
            fn(0);
        }
   })
    
}

//Sort Table rows
const sortObj = sortobj =>{
    let obj ={};

    obj = {
        Id : sortobj.Id,
        Title : sortobj.Title,
        Name : sortobj.Name,
        Phone_Number : sortobj.Phone_Number,
        Email : sortobj.Email,
        Start_Date : sortobj.Start_Date,
        End_Date : sortobj.End_Date,
        Location : sortobj.Location    
    }

        return obj;
}



//Create Dynamic Elements Tags 

const createDynamicElement = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);

    if(appendTo) appendTo.appendChild(element);

    if(fn) fn(element);
}
