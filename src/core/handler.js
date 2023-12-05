import { productUi } from "../app/product";
import { calculateRecordTotal, recordUi, recordUpdate } from "../app/record";
import {
  newProductForm,
  productDrawer,
  productGroup,
  productSelect,
  quantityInput,
  recordForm,
  recordGroup,
} from "./selectors";
import { products } from "./variable";

export const manageProductBtnHandler = () => {
  productDrawer.classList.toggle("translate-x-full");
  productDrawer.classList.add("duration-200");
};

export const newProductFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(newProductForm);
  const newProduct = {
    id: Date.now(),
    name: formData.get("new_product_name"),
    price: formData.get("new_product_price"),
  };

  productGroup.append(productUi(newProduct));
  productSelect.append(new Option(newProduct.name, newProduct.id));
  products.push(newProduct);

  newProductForm.reset();
};

export const recordFormHandler = (event) => {
  event.preventDefault();
  // id => product => price,name
  const currentProduct = products.find(
    (product) => product.id == productSelect.value
  );


  const isExist = app.querySelector(`[product-id='${currentProduct.id}']`);

  if (isExist) {
    recordUpdate(currentProduct.id,quantityInput.valueAsNumber)

    recordForm.reset();
  } else {
    recordGroup.append(
      recordUi(
        currentProduct.id,
        currentProduct.name,
        currentProduct.price,
        quantityInput.valueAsNumber
      )
    );

    recordForm.reset();
  }
};
