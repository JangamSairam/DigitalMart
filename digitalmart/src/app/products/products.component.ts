import { Component } from '@angular/core';
import { CategoryList } from '../model/Category.DataSource';
import { Product } from '../model/Product';
import { ProductList } from '../model/Product.DataSource';
import { ProductsService } from '../products.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../app.component.css', 'products.component.css']
})

export class ProductsComponent {
  activeCategoryId:any;
  active: number = -1;
  categoryId: any = -1;
  productList: Product[] = [];
  constructor(private productService: ProductsService) {
    this.activeCategoryId = -1;
   }

  
  ngOnInit(): void {
    this.getProductsFromService();
  }

// We fill the product list from the service.
  getProductsFromService(): void {
    this.productService.getProductList()
      .subscribe(product => {
        this.productList = product;
      });
  }


  //We print categories on the products
  categoryList() {
    return CategoryList.filter(x=>x.Status==true);
  }

  //this method provides category filtering
  filterProduct() {
    if (this.categoryId == -1) return ProductList.filter(x=> x.Stock>0);
    return ProductList.filter(x => x.Category.Id == this.categoryId && x.Status==true && x.Stock>0);
  }
   
  //we change id to selection for category filtering
  changeId(id: any) {
    this.categoryId = id;
    this.activeCategoryId = id;

  }

}
