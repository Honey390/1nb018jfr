import Swal from "sweetalert2";
import { app, recordGroup, recordTableRow } from "../core/selectors";

export const recordUi = (id, productName, productPrice, quantity) => {
  const cost = productPrice * quantity;
  const recordTemplate = recordTableRow.content.cloneNode(true);
  recordTemplate.querySelector("tr").setAttribute("product-id", id);
  recordTemplate.querySelector(".record-name").innerText = productName;
  recordTemplate.querySelector(".record-price").innerText = productPrice;
  recordTemplate.querySelector(".record-q").innerText = quantity;
  recordTemplate.querySelector(".record-cost").innerText = cost;
  return recordTemplate;
};

export const recordUpdate = (tableRow, quantity) => {
  const currentRow = app.querySelector(`tr[product-id="${tableRow}"]`);
  const currentRowQ = currentRow.querySelector(".record-q");
  const currentRowPrice = currentRow.querySelector(".record-price");
  const currentRowCost = currentRow.querySelector(".record-cost");

  if (quantity > 0 || currentRowQ.innerText > 1) {
    currentRowQ.innerText = parseInt(currentRowQ.innerText) + quantity;
    currentRowCost.innerText =
      currentRowQ.innerText * currentRowPrice.innerText;

  }
};

export const calculateRecordTotal = () => {
  const total = [...document.querySelectorAll(".record-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );

  recordTotal.innerText = total;

  return total;
};
export const recordGroupHandler = (event) => {
  // console.log(event.target);
  if (event.target.classList.contains("record-del")) {
   
    Swal.fire({
      title:"Are you sure to delete?",
      text:"You won't be able to revert this!",
      icon:"question",
      showCancelButton:true,
      confirmButtonColor:"#324232",
      cancelButtonColor:"#d33",
      confirmButtonText:"Confirm"

    }).then((result) => {
      if(result.isConfirmed){
        event.target.closest("tr").remove();
      }
      
    })



  } else if (event.target.classList.contains("q-add")) {
    recordUpdate(event.target.closest("tr").getAttribute("product-id"), 1);
  } else if (event.target.classList.contains("q-sub")) {
    recordUpdate(event.target.closest("tr").getAttribute("product-id"), -1);
  }
};
export const printBtnHandler = () => {
  print();
};



//Observer
export const recordObserver = () => {
  const options = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  //callback is watching the changes ,if changes ,do callback fun
  const callback = () => {
    calculateRecordTotal();
  };

  const observer = new MutationObserver(callback);

  observer.observe(recordGroup, options);
};
