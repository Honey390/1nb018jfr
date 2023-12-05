import { productRender } from "./app/product";
import { printBtnHandler, recordGroupHandler, recordObserver } from "./app/record";
import { manageProductBtnHandler, newProductFormHandler, recordFormHandler } from "./core/handler";
import { closeDrawer, manageProductBtn, newProductForm, printBtn, recordForm, recordGroup } from "./core/selectors";
import { products } from "./core/variable";

class Invoice{
    Observers(){
        recordObserver();

    }
    initialRender(){
        productRender(products);

    }
    listener(){
        manageProductBtn.addEventListener("click",manageProductBtnHandler)
        closeDrawer.addEventListener("click",manageProductBtnHandler)
        newProductForm.addEventListener("submit",newProductFormHandler)
        recordForm.addEventListener("submit",recordFormHandler)
        recordGroup.addEventListener("click",recordGroupHandler)
        printBtn.addEventListener("click",printBtnHandler)

    }
    init(){
        // console.log("Invoice app start");
        this.initialRender();
        this.listener();
        this.Observers();
    }
    
}

export default Invoice;
