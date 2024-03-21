import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  newProduct: any = {};

  constructor(private productService: ProductService) {}

  addProduct() {
    this.productService.addProduct(this.newProduct);
    this.newProduct = {};
  }
}
