var selectedRow = null;
var btn = document.querySelector(".button")
btn.addEventListener("click", employdata);


function employdata(){
  var ax = read_Input_Value();
  if (selectedRow == null){
    create_Tr_Td(ax);
    remove_input_value()
  }
  else{   
    updatefunc(ax); 
    remove_input_value(); 
    selectedRow = null;
  }

}

function read_Input_Value(){
  var redemp={} 
  redemp["ename"] = document.querySelector(".empname").value;
  redemp["des"] = document.querySelector(".designation").value;
  redemp["mob"] = document.querySelector(".mobile").value;
  redemp["salary"] = document.querySelector(".empsalary").value;
  redemp["img"] = document.querySelector(".img").value;
  return redemp
}
function create_Tr_Td(x){
  var empTable = document.querySelector(".list");
  var emp_tr = empTable.insertRow(empTable.length);
  var emp_td1 = emp_tr.insertCell(0);
  var emp_td2 = emp_tr.insertCell(1);
  var emp_td3 = emp_tr.insertCell(2);
  var emp_td4 = emp_tr.insertCell(3);
  var emp_td5 = emp_tr.insertCell(4);
  var emp_td6 = emp_tr.insertCell(5);
  var emp_td7 = emp_tr.insertCell(6);
  var totalRowCount = document.querySelector(".list tr").length;
  emp_td1.innerHTML = empTable.rows.length-1;


  emp_td2.innerHTML = x.ename;   
    emp_td3.innerHTML = x.des;
    emp_td4.innerHTML = x.mob;
  emp_td5.innerHTML = x.salary;
  emp_td6.innerHTML = x.img;
  
  emp_td6.innerHTML = '<a class="edt" onClick="onEdit(this)">Edit</a>  / <a class="dlt" onClick="onDelete(this)">Delete</a>';
}

function remove_input_value(){
  document.querySelector(".empname").value= " ";
  document.querySelector(".designation").value= " ";
  document.querySelector(".mobile").value= " ";
  document.querySelector(".empsalary").value= " ";  
}

function onEdit(y){
  console.log(y);

  
    selectedRow = y.parentElement.parentElement;
    
    document.querySelector(".empname").value = selectedRow.cells[1].innerHTML;
    document.querySelector(".designation").value = selectedRow.cells[2].innerHTML;
     document.querySelector(".mobile").value = selectedRow.cells[3].innerHTML;
    document.querySelector(".empsalary").value = selectedRow.cells[4].innerHTML;
}

function updatefunc(redemp){
  selectedRow.cells[1].innerHTML = redemp.ename;
  selectedRow.cells[2].innerHTML = redemp.des;
  selectedRow.cells[3].innerHTML = redemp.mob;
  selectedRow.cells[4].innerHTML = redemp.salary;
  
}


function onDelete() {
    if (confirm('Are you sure to delete this record ?')) {
        var selectdelete = document.querySelector("a.dlt");
        selectdelete = selectdelete.parentElement.parentElement.remove(0);
    }
}


function sortTableByColumn(table, column, asc = true) {
const dirModifier = asc ? 1 : -1;
const tBody = table.tBodies[0];
const rows = Array.from(tBody.querySelectorAll("tr"));

// Sort each row
const sortedRows = rows.sort((a, b) => {
const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
});

// Remove all existing TRs from the table
while (tBody.firstChild) {
tBody.removeChild(tBody.firstChild);
}

// Re-add the newly sorted rows
tBody.append(...sortedRows);

// Remember how the column is currently sorted
table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll("#employeeList th").forEach(headerCell => {
headerCell.addEventListener("click", () => {
const tableElement = headerCell.parentElement.parentElement.parentElement;
const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
const currentIsAscending = headerCell.classList.contains("th-sort-asc");

sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
});
});