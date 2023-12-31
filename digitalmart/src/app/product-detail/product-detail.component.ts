import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../model/Cart';
import { CartList } from '../model/Cart.DataSource';
import { Product } from '../model/Product';
import { RoleList } from '../model/Role.DataSource';
import { User } from '../model/User';
import { UserList } from '../model/User.DataSource';
import { authUser } from '../model/UserAuth';
import { ProductsService } from '../products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product?: Product;
  Swal = Swal;
  isNewProduct: boolean = true;
  maxBasketNumber: any;
  basketCounter = 1;
  index?: number;


  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router:Router) {

  }

  ngOnInit(): void {
    this.getProduct();
    this.maxBasketNumber = this.product?.Stock;
  }

  getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(Number(id))
      .subscribe(product => this.product = product)
  }

  minusBasketCounter() { this.basketCounter--; }

  plusBasketCounter() { this.basketCounter++; }


  addBasket(product: any, quantity?: any) {
    CartList.filter(x => x.Status == true).forEach((item) => {
      if (item.Product?.Id == product?.Id) this.isNewProduct = false;
    })

    if (this.isNewProduct) {

      if (authUser.length > 0) {// if there is a user in the system
        CartList.push(new Cart(CartList.length + 1, authUser[0], product, quantity, Number(product?.UnitPrice) * Number(quantity), true));
        Swal.fire("Product Added to Cart!", "Product Successfully Added to Cart!", "success");
      }
      else { // if there is no user in the system, we give default guest user
        CartList.push(new Cart(CartList.length + 1, UserList[1], product, quantity, Number(product?.UnitPrice) * Number(quantity), true));
        Swal.fire("Product Added to Cart!", "Product Added to Cart Successfully!", "success");
      }

      this.basketCounter = 1;

    }
    else {
      // find the user
      if (authUser.length > 0) {
        this.index = CartList.filter((cart) => cart.Status == true&&cart.user==authUser[0]).findIndex((item) => item.Product.Id == product?.Id);
      }
      else{
        this.index = CartList.filter((cart) => cart.Status == true &&cart.user==UserList[1]).findIndex((item) => item.Product?.Id == product?.Id);
      }

      //stock control
      if (Number(CartList[this.index].Quantity) + Number(quantity) <= Number(product?.Stock)) {

        CartList[this.index].Quantity = Number(CartList[this.index].Quantity) + Number(quantity);

        CartList[this.index].TotalPrice = Number(CartList[this.index].TotalPrice) + Number(product?.UnitPrice) * Number(quantity);

        this.basketCounter = 1;
        Swal.fire("Product Quantity Increased!", "The Number of Products Has Been Successfully Increased!", "success");

      }
      else Swal.fire("Product Quantity Has Not Been Increased!", "Insufficient Stock!", "error");
    }

    console.log(CartList);

  }
}
