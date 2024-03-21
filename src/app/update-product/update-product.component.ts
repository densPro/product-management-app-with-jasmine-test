import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  productId: number = 0;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = { ...this.productService.getProduct(this.productId) };
  }

  updateProduct() {
    this.productService.updateProduct(this.product);
  }
}
