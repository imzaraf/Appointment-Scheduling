// const appointmentDB = (dbName,dbTable) => {


// const DB = new Dexie (dbName);

// DB.version(1).stores(dbTable);  

// DB.open();

// return DB;
// }





// //Submit Function
// const bulkcreate = (dbTable, data) => {
    
//     let flag = empty(data);
//     if(flag)
//     {
//         dbTable.bulkAdd([data]);
//         console.log("Data Submitted Successfully.");
//     }
//     else{
//         console.log("Please Provide the Data.");
//     }    
// return flag;
// }

// //check textbox validation

// const empty = object => {
//     let flag = false;

//     for(const value in object)
//     {
//         if(object[value] != "" && object.hasOwnProperty(value))
//         {
//             flag = true;
//         }else{
//             flag = false;
//         }
//     }

//     return flag;
// }

// //getData from DB

// const getDataCount= (dbTable,fn) =>{
//     let index = 0;
//     let obj = {};

//   dbTable.count((count)=>{
//         if(count){
//             dbTable.each(table =>{
                
//                 obj = sortObj(table);
//                 fn(obj, index++)
//             })
//         }
//         else{
//             fn(0);
//         }
//    })
    
// }

// //Sort Table rows
// const sortObj = sortobj =>{
//     let obj ={};

//     obj = {
//         Id : sortobj.Id,
//         Title : sortobj.Title,
//         Name : sortobj.Name,
//         Phone_Number : sortobj.Phone_Number,
//         Email : sortobj.Email,
//         Start_Date : sortobj.Start_Date,
//         End_Date : sortobj.End_Date,
//         Location : sortobj.Location    
//     }

//         return obj;
// }



// //Create Dynamic Elements Tags 

// const createDynamicElement = (tagname, appendTo, fn) => {
//     const element = document.createElement(tagname);

//     if(appendTo) appendTo.appendChild(element);

//     if(fn) fn(element);
// }

// //Export Functions


// // export default appointmentDB;

// // export {
// //     bulkcreate,getDataCount, createDynamicElement
    
// // }